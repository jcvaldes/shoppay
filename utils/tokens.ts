import jwt from 'jsonwebtoken'

export const createdActivationToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET!, {
    expiresIn: '2d',
  })
}
