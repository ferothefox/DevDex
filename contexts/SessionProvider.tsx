'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

export default (props: SessionProviderProps) => {
  return <SessionProvider {...props} />
}
