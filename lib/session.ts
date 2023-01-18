import { Session } from 'next-auth'

export const getSession = async (cookie: string): Promise<Session | null> => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: { cookie },
  })

  if (!response?.ok) {
    return null
  }

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}
