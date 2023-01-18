import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return await searchPostContent(req, res)
}

const searchPostContent = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.body.query

  try {
    const allPosts = await db.post.findMany({
      where: {
        content: {
          search: query,
        },
      },
    })

    return res.status(200).json({ allPosts, success: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message: 'Oops, something broked while searching post content',
      success: false,
    })
  }
}
