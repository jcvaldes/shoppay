import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter, expressWrapper } from 'next-connect'
import db from '@/utils/db'
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import { createdActivationToken } from '@/utils/tokens'
import { sendEmail } from '@/utils/sendEmail'

interface RequestBody {
  name: string
  email: string
  password: string
}

const router = createRouter<NextApiRequest, NextApiResponse>()

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb()
    const { name, email, password }: RequestBody = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' })
    }
    console.log(req.body)
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'This email already exists' })
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' })
    }
    const cryptedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({ name, email, password: cryptedPassword })
    const addedUser = await newUser.save()
    const activation_token = createdActivationToken({
      id: addedUser._id.toString(),
    })
    const url = `${process.env.BASE_URL}/activate/${activation_token}`
    sendEmail(email, url, '', 'Activate your account.')
    // res.send(url)
    await db.disconnectDb()
    res.json({
      message: 'Register success! Please activate your email to start',
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
