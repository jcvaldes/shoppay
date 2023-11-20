import nodemailer, { TransportOptions } from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import { google } from 'googleapis'
import { activateEmailTemplate } from '@/emails/activateEmailTemplate'

const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND,
)

//send email

export const sendEmail = async (
  to: string,
  url: string,
  txt: string,
  subject: string,
  template: Function,
) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  })
  console.log('refresh token')
  console.log({
    MAILING_SERVICE_REFRESH_TOKEN,
  })
  const accessToken = await oauth2Client.getAccessToken()
  console.log({ accessToken })

  console.log('create transporter')
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        // si la cuenta de google esta configurada para usar oauth2
        // para permitir aplicaciones menos seguras no esta mas disponible
        // es necesario crear un password para aplicación.
        pass: 'rsagnslkirqnvpwm', // rsag nslk irqn vpwm
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        // para cambiarlo ir a https://developers.google.com/oauthplayground y
        // ver el classroom que esta explicado en la seccion de nextjs
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken: accessToken.token!,
      },
    }),
  )
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html: template(to, url),
  }
  console.log('sendemail')
  console.log(mailOptions)
  transporter.sendMail(mailOptions, (err, infos) => {
    console.log({ err })
    if (err) {
      console.log(err)
      return true
    } else {
      console.log(infos.response)
      return false
    }
  })
}
