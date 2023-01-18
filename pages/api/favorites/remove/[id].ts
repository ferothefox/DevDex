import db from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) =>
  await addLike(req, res)

const addLike = async (req: NextApiRequest, res: NextApiResponse) => {
  const postToRemoveFavorite = req.query
  const userUnfavoriting = req.body.id

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session && process.env.NODE_ENV === 'production')
    return res
      .status(401)
      .json({ message: 'Unable to perform this action', success: false })

  try {
    const user = await db.user?.findUnique({
      where: {
        id: userUnfavoriting,
      },
    })

    const favorited = await db.post.findUnique({
      where: {
        id: parseInt(postToRemoveFavorite.id as string),
      },
      select: {
        favoritesCount: true,
      },
    })

    if (user && favorited) {
      const favorites = favorited.favoritesCount.filter(
        fav => fav.id !== userUnfavoriting
      )

      const requiredVals = favorites.map(fav => ({
        id: fav.id,
      }))

      const unfavorite = await db.post.update({
        where: {
          id: parseInt(postToRemoveFavorite.id as string),
        },
        data: {
          favoritesCount: {
            set: requiredVals,
          },
        },
        include: {
          favoritesCount: true,
        },
      })

      return res.status(200).json({ unfavorite, success: true })
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
