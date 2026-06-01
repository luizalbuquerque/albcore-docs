import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

export default {
  logo: (
    <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
      ⬡ AlbCore Platform
    </span>
  ),
  project: {
    link: 'https://github.com/Albuquerque-Tech/albcore-docs',
  },
  docsRepositoryBase: 'https://github.com/Albuquerque-Tech/albcore-docs/tree/main',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return { titleTemplate: '%s – AlbCore Docs' }
    }
    return { title: 'AlbCore Platform – Documentação' }
  },
  head() {
    const { frontMatter } = useConfig()
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={
            frontMatter.description ||
            'AlbCore Platform – Plataforma SaaS whitelabel com arquitetura modular'
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </>
    )
  },
  primaryHue: 213,
  primarySaturation: 90,

  sidebar: {
    defaultMenuCollapseLevel: 1,
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
    text: (
      <span>
        {new Date().getFullYear()} ©{' '}
        <a href="https://albuquerquetech.com.br" target="_blank" rel="noreferrer">
          Albuquerque Tech
        </a>{' '}
        — AlbCore Platform
      </span>
    ),
  },
  editLink: {
    text: 'Editar esta página →',
  },
  feedback: {
    content: 'Dúvidas? Fale conosco →',
    labels: 'feedback',
  },
  banner: {
    key: 'albcore-v0.1',
    text: <span>🚀 AlbCore v0.1 em desenvolvimento ativo</span>,
  },
}

