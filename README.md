# albcore-docs

Documentação oficial da **AlbCore Platform** — construída com
[Nextra](https://nextra.site/) (Next.js).

Publicada em **https://api-core.albuquerquetech.com.br/documentation**

## Stack

- Next.js 14 (`output: 'export'` — site estático)
- Nextra 2 + `nextra-theme-docs`

## Desenvolvimento

### Opção 1: Script Automático
```bash
./start-docs.sh
```

### Opção 2: Manual
```bash
npm install   # primeira vez
npm run dev   # http://localhost:3001
```

### Troubleshooting

**Erro: 'next' não reconhecido**
```bash
npm install
```

**Porta 3001 em uso**
```bash
netstat -ano | findstr :3001
taskkill //PID <numero> //F
```

## Build

```bash
npm run build    # gera ./out (HTML estático)
```

## Deploy

Push na `main` dispara o pipeline que faz build e publica na VPS.
Veja [`DEPLOY.md`](./DEPLOY.md) para detalhes (secrets + Nginx).

## Estrutura

```
pages/
├── index.mdx               Início
├── introduction/           Visão geral, stack, multi-tenancy, segurança
├── architecture/           Camadas, pastas, decisões, fluxo de request
├── modules/                Módulos da plataforma
├── api-reference/          Autenticação, respostas, exemplos
├── deployment/             Docker, ambientes
├── contributing/           Como criar um novo módulo
└── roadmap.mdx             Roadmap
```
