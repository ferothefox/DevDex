// export default async (res: NextApiResponse) => {
//   try {
//     const allUsers = await db.user?.findMany()
//     return res.status(200).json({ allUsers, success: true })
//   } catch (e) {
//     console.error(e)
//     return res.status(500).json({
//       e,
//       message: 'Oops, something broked while fetching all users.',
//       success: false,
//     })
//   }
// }

export {}
