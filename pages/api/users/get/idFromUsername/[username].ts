import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const whoToGet = req.query

  try {
    const userId = await db.user?.findUnique({
      where: {
        username: whoToGet.username?.toString(),
      },
      select: {
        id: true,
      },
    })

    return res.status(200).json({ userId, success: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      e,
      message:
        'Oops, something broked while fetching a user\'s id by their username.',
      success: false,
    })
  }
}
