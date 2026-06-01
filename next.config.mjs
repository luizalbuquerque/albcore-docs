import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
})

// Quando servido sob um sub-path (ex.: /documentation via Nginx),
// definir DOCS_BASE_PATH faz o Next.js prefixar rotas e assets.
const basePath = process.env.DOCS_BASE_PATH || ''

export default withNextra({
  output: 'export',
  basePath,
  images: {
    unoptimized: true,
  },
})
