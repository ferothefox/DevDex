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

  return req.method === 'POST'
    ? await createUser(req, res)
    : res.status(400).json({
      message: '/api/user/create requires a POST request. ',
      success: false,
    })
}

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const key = req.query.key

  if (key !== process.env.ADMIN_API_KEY)
    return res
      .status(401)
      .json({ message: 'Unable to perform this action', success: false })

  try {
    const newUser = await db.user?.create({
      data: {
        email: body.email,
        flair: body.flair,
        username: body.username,
        image: body.image,
        color: body.color,
        premium: false,
        staff: false,
      },
    })

    return res.status(200).json({ newUser, success: true })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ e, message: 'Oops, something broked', success: false })
  }
}
