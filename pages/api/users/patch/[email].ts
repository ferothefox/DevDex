import db from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const key = req.body.key
  const whoToUpdate = req.query.email

  if (key !== process.env.ADMIN_API_KEY)
    return res
      .status(401)
      .json({ message: 'Unable to perform this action', success: false })

  try {
    const updatedUser = await db.user?.update({
      where: {
        email: whoToUpdate as string,
      },
      data: {
        finishedSetup: body.finishedSetup || undefined,
        flair: body.flair || undefined,
        username: body.username || undefined,
        image: body.image || undefined,
        color: body.color || undefined,
        banner: body.banner || undefined,
        bio: body.bio || undefined,
      },
    })

    return res.status(200).json({ updatedUser, success: true })
  } catch (e) {
    return res
      .status(500)
      .json({ e, message: 'Oops, something broked', success: false })
  }
}
