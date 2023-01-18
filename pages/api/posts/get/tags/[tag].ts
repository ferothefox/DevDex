import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await unstable_getServerSession(req, res, authOptions)

  // if (!session && process.env.NODE_ENV === 'production')
  //   return res
  //     .status(401)
  //     .json({ message: 'Unable to perform this action', success: false })

  return await getPostsByTag(req, res)
}

const getPostsByTag = async (req: NextApiRequest, res: NextApiResponse) => {
  const whatTagsToGet = req.query

  try {
    const allPosts = (
      await db.post.findMany({
        where: {
          tags: {
            some: {
              name: {
                equals: whatTagsToGet.tag?.toString(),
              },
            },
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
          author: true,
          _count: {
            select: {
              children: true,
            },
          },
        },
      })
    ).reverse()

    return res.status(200).json({ allPosts, success: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message: 'Oops, something broked while fetching posts of this tag',
      success: false,
    })
  }
}
