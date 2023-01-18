import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await deletePost(req, res)
}

const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const postToDelete = req.query
  const postAuthor = req.body.id

  try {
    const user = await db.user?.findUnique({
      where: {
        id: postAuthor,
      },
    })

    const post = await db.post.findUnique({
      where: {
        id: parseInt(postToDelete.id as string),
      },
    })

    if (user?.id === post?.authorId) {
      await db.post.delete({
        where: {
          id: parseInt(postToDelete.id as string),
        },
      })
      return res.status(200).json({ message: 'Post deleted', success: true })
    } else {
      return res
        .status(401)
        .json({ message: 'Unable to perform this action', success: false })
    }
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ message: 'Unable to delete post', success: false })
  }
}
