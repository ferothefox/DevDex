import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) =>
  await getPost(req, res)

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const postToGet = req.query

  try {
    const post = await db.post.findUnique({
      where: {
        id: parseInt(postToGet.id as string),
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
        author: true,
        _count: {
          select: {
            children: true,
          },
        },
      },
    })

    return res.status(200).json({ post, success: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message: 'Oops, something broked while fetching a post.',
      success: false,
    })
  }
}
