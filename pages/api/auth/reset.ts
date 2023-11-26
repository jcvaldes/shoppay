import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter, expressWrapper } from 'next-connect'
import bcrypt from 'bcrypt'
import db from '@/utils/db'
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import { createResetToken } from '@/utils/tokens'
import { sendEmail } from '@/utils/sendEmail'
import { resetEmailTemplate } from '@/emails/resetEmailTemplate'

interface RequestBody {
  userId: string
  password: string
}

const router = createRouter<NextApiRequest, NextApiResponse>()

router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb()
    const { userId, password }: RequestBody = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: 'This account does not exist.' })
    }
    const passwordEncrypted = await bcrypt.hash(password, 12)
    await user.updateOne({
      password: passwordEncrypted,
    })
    res.json({ email: user.email })
    await db.disconnectDb()
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
