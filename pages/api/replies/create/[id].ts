import db from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const postToReplyTo = req.query
  const body = req.body

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session && process.env.NODE_ENV === 'production')
    return res
      .status(401)
      .json({ message: 'Unable to perform this action', success: false })

  try {
    const reply = await db.post.findUnique({
      where: {
        id: parseInt(postToReplyTo.id as string),
      },
    })

    const newReply = await db.post.create({
      data: {
        content: body.content,
        author: {
          connect: {
            id: session?.user?.id as string,
          },
        },
        parent: {
          connect: {
            id: parseInt(postToReplyTo.id as string),
          },
        },
        isReply: true,
        depth: reply?.depth ? reply.depth + 1 : 1,
      },
    })

    return res.status(200).json({ newReply, success: true })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ e, message: 'Oops, something broked', success: false })
  }
}
