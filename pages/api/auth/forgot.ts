import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import db from '@/utils/db'
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import { createResetToken, createdActivationToken } from '@/utils/tokens'
import { sendEmail } from '@/utils/sendEmail'
import { resetEmailTemplate } from '@/emails/resetEmailTemplate'

interface RequestBody {
  email: string
}

const router = createRouter<NextApiRequest, NextApiResponse>()

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb()
    const { email }: RequestBody = req.body
    console.log('email listo')
    console.log({ email })

    if (!email) {
      return res.status(400).json({ message: 'Please fill in all fields.' })
    }
    console.log('valid email')
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }
    console.log('find one user')
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'This email does not exist.' })
    }
    console.log('end find one user')
    console.log('create reset token')

    const token = createResetToken({
      id: user._id.toString(),
    })
    console.log('end create reset token')
    console.log({ id: user._id.toString() })

    const url = `${process.env.BASE_URL}/auth/reset/${token}`
    console.log('email por enviar de reset password')
    sendEmail(email, url, '', 'Reset your password.', resetEmailTemplate)
    // res.send(url)
    console.log('envio email')
    await db.disconnectDb()
    console.log('email enviado')
    res.json({
      message: 'An email has been sent to you, use it to reset your password',
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
// const handler = nc<NextApiRequest, NextApiResponse>()

// handler.post(async (req, res) => {
//   try {
//     await db.connectDb()
//     const { name, email, password }: RequestBody = req.body
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Please fill in all fields.' })
//     }
//     console.log(req.body)
//     if (!validateEmail(email)) {
//       return res.status(400).json({ message: 'Invalid email' })
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// export default handler
