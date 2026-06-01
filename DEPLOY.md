# Deploy — AlbCore Docs

Documentação da plataforma (Nextra / Next.js static export), servida em dois
níveis no mesmo domínio/porta da API (o Nginx roteia por path — sem container):

| Área        | URL                                                            | Acesso     |
|-------------|----------------------------------------------------------------|------------|
| **Pública** | https://api-core.albuquerquetech.com.br/documentation          | Aberto     |
| **Interna** | https://api-core.albuquerquetech.com.br/documentation/internal | Basic Auth |

- **Pública:** Início, Introdução, API Reference, Módulos.
- **Interna:** site completo (inclui Arquitetura, Deploy & Infra, Contribuindo, Roadmap).

## Como funciona (dois builds isolados)

`npm run build:split` (`scripts/build-split.mjs`) gera **dois** exports estáticos:

1. `out-internal/` — site completo, `basePath=/documentation/internal`.
2. `out-public/` — apenas seções públicas, `basePath=/documentation`.

> **Por que dois builds e não só senha no path?** No Next.js o conteúdo das
> páginas é embutido nos chunks JS e no índice de busca (`nextra-data-*.json`).
> Proteger só o HTML deixaria o conteúdo interno vazar pelos assets públicos.
> Como o build público **não contém** nenhuma página interna, não há vazamento.
> O CI inclui um passo que falha se algo interno aparecer em `out-public/`.

O pipeline (`.github/workflows/deploy.yml`) faz `rsync`:
- `out-public/`   → `/var/www/albcore-docs`          (público)
- `out-internal/` → `/var/www/albcore-docs-internal` (Basic Auth)

## Pré-requisitos (uma vez só)

### 1. Secrets no repositório GitHub

Em **Settings → Secrets and variables → Actions**, adicione (mesmos nomes do `albcore-api`):

| Secret         | Valor                |
|----------------|----------------------|
| `VPS_HOST`     | `191.101.18.194`     |
| `VPS_USER`     | usuário SSH da VPS   |
| `VPS_PASSWORD` | senha SSH da VPS     |

### 2. Credenciais da área interna (Basic Auth) na VPS

```bash
HASH=$(openssl passwd -apr1 'SUA_SENHA')
echo "albcore:$HASH" > /etc/nginx/.htpasswd-albcore
chmod 640 /etc/nginx/.htpasswd-albcore && chown root:www-data /etc/nginx/.htpasswd-albcore
```

### 3. Blocos Nginx na VPS

Adicione o conteúdo de `infra/nginx/albcore-docs.conf` dentro do
`server { ... }` que já atende `api-core.albuquerquetech.com.br`, depois:

```bash
nginx -t && systemctl reload nginx
```

## Deploy

Automático: todo push na branch `main` dispara build + deploy.
Manual: aba **Actions → Deploy Docs → Run workflow**.

## Desenvolvimento local

```bash
npm install
npm run dev      # http://localhost:3001  (site completo, sem basePath)
```

Para reproduzir os dois builds de produção:

```bash
npm run build:split
npx serve out-public   -l 3001   # http://localhost:3001/documentation/
npx serve out-internal -l 3002   # http://localhost:3002/documentation/internal/
```
