import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  const { asPath } = useRouter()

  useEffect(() => {
    const isCtec = asPath.startsWith('/ctec')
    document.documentElement.setAttribute('data-site', isCtec ? 'ctec' : 'albcore')
  }, [asPath])

  return <Component {...pageProps} />
}
