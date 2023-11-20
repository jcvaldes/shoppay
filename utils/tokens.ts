import jwt from 'jsonwebtoken'

export const createdActivationToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET!, {
    expiresIn: '2d',
  })
}

export const createResetToken = (payload: any) => {
  return jwt.sign(payload, process.env.RESET_TOKEN_SECRET!, {
    expiresIn: '6h',
  })
}

export const verifyActivationToken = (token: string) => {
  return jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET!)
}
