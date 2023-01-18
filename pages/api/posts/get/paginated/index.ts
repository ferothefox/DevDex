import db from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session && process.env.NODE_ENV === 'production')
    return res
      .status(401)
      .json({ message: 'Unable to perform this action', success: false })

  return await getPostsPaginated(req, res)
}

const getPostsPaginated = async (req: NextApiRequest, res: NextApiResponse) => {
  const takeQuery = (req.query.take as string) ?? undefined
  const take = takeQuery ? parseInt(takeQuery) : 5
  const cursorQuery = (req.query.cursor as string) ?? undefined
  const skip = cursorQuery ? 1 : 0
  const cursor = cursorQuery ? { id: parseInt(cursorQuery) } : undefined

  try {
    const posts = await db.post.findMany({
      skip,
      take,
      cursor,
      orderBy: [
        {
          id: 'desc',
        },
      ],
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
        author: {
          select: {
            badges: true,
            banner: true,
            bio: true,
            color: true,
            flair: true,
            image: true,
            name: true,
            username: true
          },
        },
        _count: {
          select: {
            children: true,
          },
        },
      },
      where: {
        isReply: false,
      },
      // i tried putting  it in the include but it kinda didnt work
      // it should be fine, prisma is just dumb
      // oki :)
      // it did work :D
    })

    return res.status(200).json({
      posts,
      nextId: posts.length === take ? posts[take - 1].id : undefined,
      success: true,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message: 'Oops, something broked while fetching all posts.',
      success: false,
    })
  }
}
