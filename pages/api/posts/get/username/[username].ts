import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return await getPostsByUsername(req, res)
}

const getPostsByUsername = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const whoToGet = req.query

  try {
    const posts = (
      await db.post.findMany({
        orderBy: [
          {
            createdAt: 'asc',
          },
        ],
        where: {
          author: {
            username: whoToGet.username?.toString(),
          },
        },
        include: {
          favoritesCount: true,
          tags: {
            select: {
              name: true,
            },
          },
          likedBy: {
            select: {
              id: true,
              username: true,
            },
          },
          children: true,
          author: true,
        },
      })
    ).reverse()

    return res.status(200).json({ posts, success: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message: 'Oops, something broked while fetching posts of this user',
      success: false,
    })
  }
}
