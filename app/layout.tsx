import { baseLink } from '@/lib/helpers'
import { getSession } from '@/lib/session'
import SessionProvider from 'contexts/SessionProvider'
import { Session } from 'next-auth'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import '../styles/globals.scss'
import Provider from './Provider'
import UserProvider from './UserProvider'

const getUser = async (session: Session | null) => {
  const res = await fetch(
    `${baseLink}/api/users/get/email/${
      process.env.NODE_ENV === 'production'
        ? session?.user?.email
        : 'hi@evan.graphics'
    }`
  )

  return await res.json()
}

export default async ({ children }: { children: ReactNode }) => {
  const session = await getSession(headers().get('cookie') ?? '')
  const user = (await getUser(session)).user

  return (
    <html lang='en'>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (() => {
              window.__onThemeChange = () => {}
              const setTheme = newTheme => {
                window.__theme = newTheme
                preferredTheme = newTheme
                document.documentElement.className = 'theme-' + newTheme
                window.__onThemeChange(newTheme)
              }
              let preferredTheme = JSON.parse(localStorage.getItem('ThemeStore')).state.theme
              window.__setPreferredTheme = newTheme => {
                setTheme(newTheme)
                localStorage.setItem('theme', newTheme)
              }
              const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
              darkQuery.addEventListener('change', e => {
                window.__setPreferredTheme(e.matches ? 'dark' : 'light')
              })
              setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
            })()
          `,
          }}
        />
      </head>
      <body>
        {
          /* @ts-expect-error Server Component */
          <Provider>
            <UserProvider value={user}>
              <SessionProvider session={session}>{children}</SessionProvider>
            </UserProvider>
          </Provider>
        }
      </body>
    </html>
  )
}
