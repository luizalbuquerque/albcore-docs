// Gera DOIS builds isolados do Nextra (static export):
//
//   out-internal/  -> site COMPLETO (público + interno), basePath /documentation/internal
//                     Servido atrás de Basic Auth no Nginx.
//   out-public/    -> APENAS seções públicas, basePath /documentation
//                     Servido aberto no Nginx.
//
// Por que dois builds? No Next.js o conteúdo das páginas é embutido nos
// chunks JS e no índice de busca (nextra-data-*.json). Proteger só o path
// do HTML não basta — o conteúdo interno vazaria pelos assets. Buildando
// separado, o bundle público NÃO contém nada do interno.

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const pagesDir = path.join(root, 'pages')
const stash = path.join(root, '.pages-stash')
const overrides = path.join(root, 'overrides', 'public')

// Seções que só existem no build interno.
const INTERNAL_ONLY = ['architecture', 'deployment', 'contributing', 'roadmap.mdx']

function build(basePath, outName) {
  console.log(`\n=== build ${outName} (basePath=${basePath || '/'}) ===`)
  execSync('next build', {
    stdio: 'inherit',
    env: { ...process.env, DOCS_BASE_PATH: basePath },
  })
  const outName_ = path.join(root, outName)
  fs.rmSync(outName_, { recursive: true, force: true })
  fs.renameSync(path.join(root, 'out'), outName_)
}

// 1) Build INTERNO = site completo
build('/documentation/internal', 'out-internal')

// 2) Build PÚBLICO = subconjunto (sem seções internas)
fs.rmSync(stash, { recursive: true, force: true })
fs.mkdirSync(stash, { recursive: true })

const moved = []
function stashItem(name) {
  const src = path.join(pagesDir, name)
  if (fs.existsSync(src)) {
    const dst = path.join(stash, name)
    fs.renameSync(src, dst)
    moved.push(name)
  }
}

try {
  // tira as seções internas de pages/
  for (const item of INTERNAL_ONLY) stashItem(item)
  // troca _meta.json e index.mdx pelos overrides públicos
  stashItem('_meta.json')
  stashItem('index.mdx')
  fs.copyFileSync(path.join(overrides, '_meta.json'), path.join(pagesDir, '_meta.json'))
  fs.copyFileSync(path.join(overrides, 'index.mdx'), path.join(pagesDir, 'index.mdx'))

  build('/documentation', 'out-public')
} finally {
  // restaura tudo (mesmo em caso de erro)
  for (const f of ['_meta.json', 'index.mdx']) {
    const cur = path.join(pagesDir, f)
    if (fs.existsSync(cur) && fs.existsSync(path.join(stash, f))) fs.rmSync(cur)
  }
  for (const name of moved) {
    const src = path.join(stash, name)
    const dst = path.join(pagesDir, name)
    if (fs.existsSync(src)) fs.renameSync(src, dst)
  }
  fs.rmSync(stash, { recursive: true, force: true })
}

console.log('\n✓ Builds prontos: out-public/ e out-internal/')
