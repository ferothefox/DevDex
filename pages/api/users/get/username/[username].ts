import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const whoToGet = req.query

  try {
    const user = await db.user?.findUnique({
      where: {
        username: whoToGet.username?.toString(),
      },
      include: {
        badges: true,
        // posts: {
        //   orderBy: [
        //     {
        //       createdAt: 'desc',
        //     },
        //   ],
        //   include: {
        //     favoritesCount: true,
        //     tags: {
        //       select: {
        //         name: true,
        //       },
        //     },
        //     likedBy: {
        //       select: {
        //         id: true,
        //         username: true,
        //       },
        //     },
        //     author: {
        //       select: {
        //         id: true,
        //         username: true,
        //         badges: true,
        //         premium: true,
        //         image: true,
        //         banner: true,
        //         bio: true,
        //         flair: true,
        //         staff: true,
        //       },
        //     },
        //   },
        // },
      },
    })

    return res.status(200).json({ user, success: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message:
        'Oops, something broked while fetching a user by their username.',
      success: false,
    })
  }
}
