'use client'

import { User } from '@prisma/client'
import { createContext, ReactNode } from 'react'

export const UserContext = createContext<User | null>(null)

export default function UserProvider({
  children,
  value,
}: {
  children: ReactNode
  value: User
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
