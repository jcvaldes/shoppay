import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import db from '@/utils/db'
import User from '@/models/User'
import { verifyActivationToken } from '@/utils/tokens'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb()
    const tokenDecoded = verifyActivationToken(req.query.hash as string) as {
      id: string
    }
    await User.findByIdAndUpdate(
      tokenDecoded.id,
      { emailVerified: true },
      { new: true },
    )
    await db.disconnectDb()
    res.json({
      message: 'Account Activated successfully',
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).end(err.message)
  },
})
