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

  const body = req.body

  try {
    const updatedUser = await db.user?.update({
      where: {
        email: session?.user?.email as string,
      },
      data: {
        email: body.email || undefined,
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

// const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   const body = req.body
//   const whoToModify = req.query

//   try {
//     const updatedUser = await db.user?.update({
//       where: {
//         email: session?.user?.email,
//       },
//       data: {
//         email: body.email || undefined,
//         flair: body.flair || undefined,
//         username: body.username || undefined,
//         avatar: body.avatar || undefined,
//         color: body.color || undefined,
//         banner: body.banner || undefined,
//         bio: body.bio || undefined,
//       },
//     })

//     return res.status(200).json({ updatedUser, success: true })
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ e, message: 'Oops, something broked', success: false })
//   }
// }
