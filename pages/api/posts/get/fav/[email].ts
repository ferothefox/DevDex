import { authOptions } from '@/pages/api/auth/[...nextauth]'
import db from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const whoToGet = req.query

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session && process.env.NODE_ENV === 'production')
    return res
      .status(401)
      .json({ message: 'Unable to perform this action', success: false })

  try {
    const favorites = await db.user?.findUnique({
      where: {
        email: whoToGet.email?.toString() || '',
      },
      select: {
        favorites: {
          include: {
            tags: true,
            likedBy: true,
            favoritesCount: true,
            children: true,
            author: true,
          },
        },
      },
    })

    return res.status(200).json({ favorites, success: true })
  } catch (e) {
    return res.status(500).json({
      e,
      message: 'something broked',
      success: false,
    })
  }
}
