import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

function useIsCtec() {
  const { asPath } = useRouter()
  return asPath.startsWith('/ctec')
}

function Logo() {
  const isCtec = useIsCtec()
  if (isCtec) {
    return (
      <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.4rem' }}>📡</span>
        CTEC Rastreamento
      </span>
    )
  }
  return (
    <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
      ⬡ AlbCore Platform
    </span>
  )
}

function FooterText() {
  const isCtec = useIsCtec()
  if (isCtec) {
    return (
      <span>
        {new Date().getFullYear()} © CTEC Rastreamento — Documentação da API
      </span>
    )
  }
  return (
    <span>
      {new Date().getFullYear()} ©{' '}
      <a href="https://albuquerquetech.com.br" target="_blank" rel="noreferrer">
        Albuquerque Tech
      </a>{' '}
      — AlbCore Platform
    </span>
  )
}

function BannerText() {
  const isCtec = useIsCtec()
  if (isCtec) return null
  return <span>🚀 AlbCore v0.1 em desenvolvimento ativo</span>
}

export default {
  logo: Logo,
  project: {
    link: 'https://github.com/Albuquerque-Tech/albcore-docs',
  },
  docsRepositoryBase: 'https://github.com/Albuquerque-Tech/albcore-docs/tree/main',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath.startsWith('/ctec')) {
      if (asPath === '/ctec') {
        return { title: 'CTEC Rastreamento — Documentação da API' }
      }
      return { titleTemplate: '%s — CTEC Rastreamento' }
    }
    if (asPath !== '/') {
      return { titleTemplate: '%s – AlbCore Docs' }
    }
    return { title: 'AlbCore Platform – Documentação' }
  },
  head() {
    const { asPath } = useRouter()
    const { frontMatter } = useConfig()
    const isCtec = asPath.startsWith('/ctec')
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={
            isCtec
              ? (frontMatter.description || 'CTEC Rastreamento — Documentação completa da API de rastreamento veicular')
              : (frontMatter.description || 'AlbCore Platform – Plataforma SaaS whitelabel com arquitetura modular')
          }
        />
        <link rel="icon" href="/favicon.ico" />
        {isCtec && (
          <script dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-site','ctec')`
          }} />
        )}
      </>
    )
  },
  primaryHue: 213,
  primarySaturation: 90,

  sidebar: {
    defaultMenuCollapseLevel: 2,
    toggleButton: true,
  },
  toc: {
    float: true,
    title: 'Nesta Página',
    backToTop: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  footer: {
    text: FooterText,
  },
  editLink: {
    text: null,
  },
  feedback: {
    content: null,
  },
  banner: {
    key: 'albcore-v0.1',
    text: BannerText,
  },
}
