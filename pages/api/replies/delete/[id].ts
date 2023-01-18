import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await deleteReply(req, res)
}

const deleteReply = async (req: NextApiRequest, res: NextApiResponse) => {
  const replyToDelete = req.query
  const replyAuthor = req.body.id

  try {
    const user = await db.user?.findUnique({
      where: {
        id: replyAuthor,
      },
    })

    const reply = await db.post.findUnique({
      where: {
        id: parseInt(replyToDelete.id as string),
      },
    })

    if (user?.id === reply?.authorId) {
      await db.post.delete({
        where: {
          id: parseInt(replyToDelete.id as string),
        },
      })
      return res.status(200).json({ message: 'Reply deleted', success: true })
    } else {
      return res
        .status(401)
        .json({ message: 'Unable to perform this action', success: false })
    }
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ message: 'Unable to delete reply', success: false })
  }
}
