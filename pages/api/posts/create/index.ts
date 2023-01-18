import db from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session && process.env.NODE_ENV === 'production')
    return res
      .status(401)
      .json({ message: 'Unable to perform this action', success: false })

  try {
    const newPost = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        tags: {
          connectOrCreate: body.tags.map((tag: { name: string }) => ({
            where: {
              name: tag.name,
            },
            create: {
              name: tag.name,
            },
          })),
        },
        author: {
          connect: {
            email: session?.user?.email as string,
          },
        },
        isReply: false,
        depth: 0,
      },
      include: {
        tags: true,
      },
    })

    return res.status(200).json({ newPost, success: true })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ e, message: 'Oops, something broked', success: false })
  }
}
