import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
})
console.log(process.env.ADMIN_EMAIL)
console.log(process.env.ADMIN_EMAIL_PASSWORD)

const mailOptions = {
  from: process.env.ADMIN_EMAIL,
  to: process.env.EMAIL_USER,
  subject: 'Test Mail',
  text: 'This is a test email from Node.js using nodemailer.',
}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('❌', error)
  }
  console.log('✅ Email sent:', info.response)
})
