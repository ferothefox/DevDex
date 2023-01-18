import db from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) =>
  await addLike(req, res)

const addLike = async (req: NextApiRequest, res: NextApiResponse) => {
  const postToRemoveLike = req.query
  const userUnliking = req.body.id

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session && process.env.NODE_ENV === 'production')
    return res
      .status(401)
      .json({ message: 'Unable to perform this action', success: false })

  try {
    const user = await db.user?.findUnique({
      where: {
        id: userUnliking,
      },
    })

    const likedBy = await db.post.findUnique({
      where: {
        id: parseInt(postToRemoveLike.id as string),
      },
      select: {
        likedBy: true,
      },
    })

    if (user && likedBy) {
      const likes = likedBy.likedBy.filter(like => like.id !== userUnliking)

      const requiredVals = likes.map(like => ({
        id: like.id,
      }))

      const unlike = await db.post.update({
        where: {
          id: parseInt(postToRemoveLike.id as string),
        },
        data: {
          likedBy: {
            set: requiredVals,
          },
        },
        include: {
          likedBy: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      })

      return res.status(200).json({ unlike, success: true })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message: 'Oops, something broked while fetching a user?.',
      success: false,
    })
  }
}
