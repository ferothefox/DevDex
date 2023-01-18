import db from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string,
    }),
  ],
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     if (session?.user && token.sub) {
  //       session.user?.id = token.sub
  //     }
  //     return session
  //   },
  //   jwt: async ({ user, token }) => {
  //     if (user) {
  //       token.sub = user?.id
  //     }
  //     return token
  //   },
  // },
  // session: {
  //   strategy: 'jwt',
  // },
}

export default NextAuth(authOptions)
