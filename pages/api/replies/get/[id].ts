import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const postReplies = req.query

  try {
    const replies = await db.post.findMany({
      where: {
        parentId: parseInt(postReplies.id as string),
      },
      include: {
        author: true,
        children: {
          include: {
            author: true,
            children: {
              include: {
                author: true,
                children: true,
              },
            },
          },
        },
      },
    })

    return res.status(200).json({ replies, success: true })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ e, message: 'Oops, something broked', success: false })
  }
}
