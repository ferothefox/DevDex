import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) =>
  await getTags(req, res)

const getTags = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allTags = await db.tag.findMany()

    return res.status(200).json({ allTags, success: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message: 'Oops, something broked while fetching all tags.',
      success: false,
    })
  }
}
