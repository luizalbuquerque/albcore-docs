# Deploy — AlbCore Docs

Documentação da plataforma (Nextra / Next.js static export) servida em:

**https://api-core.albuquerquetech.com.br/documentation**

Mesma porta/domínio da API — o Nginx roteia o path `/documentation`
para os arquivos estáticos. Não precisa de container nem porta extra.

## Como funciona

1. `next build` com `output: 'export'` gera HTML estático em `out/`.
2. O `basePath` (`/documentation`) é injetado via env `DOCS_BASE_PATH` no
   build, então todos os assets e links já saem prefixados.
3. O pipeline (`.github/workflows/deploy.yml`) faz `rsync` de `out/` para
   `/var/www/albcore-docs` na VPS e recarrega o Nginx.

## Pré-requisitos (uma vez só)

### 1. Secrets no repositório GitHub

Em **Settings → Secrets and variables → Actions**, adicione (os mesmos
nomes usados no `albcore-api`):

| Secret         | Valor                         |
|----------------|-------------------------------|
| `VPS_HOST`     | `191.101.18.194`              |
| `VPS_USER`     | usuário SSH da VPS            |
| `VPS_PASSWORD` | senha SSH da VPS              |

### 2. Bloco Nginx na VPS

Adicione o conteúdo de `infra/nginx/albcore-docs.conf` dentro do
`server { ... }` que já atende `api-core.albuquerquetech.com.br`, depois:

```bash
nginx -t && systemctl reload nginx
```

## Deploy

Automático: todo push na branch `main` dispara o build + deploy.
Manual: aba **Actions → Deploy Docs → Run workflow**.

## Desenvolvimento local

```bash
npm install
npm run dev      # http://localhost:3001  (sem basePath)
```

Para testar exatamente como em produção (com `/documentation`):

```bash
DOCS_BASE_PATH=/documentation npm run build
npx serve out -l 3001
# acesse http://localhost:3001/documentation/
```
