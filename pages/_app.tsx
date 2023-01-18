import { Figtree } from '@next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { useThemeStore } from 'lib/themeState'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import 'styles/app.scss'
import 'styles/globals.scss'

const figtree = Figtree()

export default ({
  Component,
  pageProps: { metaTags, session, ...pageProps },
}: AppProps) => {
  const queryClient = new QueryClient()
  const system = useThemeStore(state => state.system)
  const theme = useThemeStore(state => state.theme)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    window.addEventListener('contextmenu', e => e.preventDefault())

    const prefersDark =
      window.matchMedia('(prefers-color-scheme: dark)').matches && system

    if (prefersDark) {
      document.documentElement.classList.add('theme-dark')
      document.documentElement.classList.remove('theme-light')
    } else if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark')
      document.documentElement.classList.remove('theme-light')
    } else {
      document.documentElement.classList.remove('theme-dark')
      document.documentElement.classList.add('theme-light')
    }

    setLoaded(true)
  }, [theme, system])

  if (!loaded)
    return (
      <Head>
        <title>DevDex</title>
        {metaTags &&
          Object.entries(metaTags as { entry: string }).map((entry, index) => (
            <meta
              key={index}
              property={entry[0]}
              content={entry[1]}
            />
          ))}
      </Head>
    )

  return (
    <>
      <Head>
        <title>DevDex</title>
        {metaTags &&
          Object.entries(metaTags as { entry: string }).map((entry, index) => (
            <meta
              key={index}
              property={entry[0]}
              content={entry[1]}
            />
          ))}
      </Head>
      <Analytics />
      <React.StrictMode>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            {/* <AppProvider createStore={createUserState(data)}> */}
            <main className={figtree.className}>
              <Component {...pageProps} />
            </main>
            {/* </AppProvider> */}
          </QueryClientProvider>
        </SessionProvider>
      </React.StrictMode>
    </>
  )
}
