// backend/utils/mailer.js
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

export const sendOrderNotification = async (order) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.EMAIL_USER, // or use order.email if available
    subject: `Order Confirmation - Order ID: ${order._id}`,
    text: `Dear ${order.name},\n\nYour order of amount ₹${order.amount} has been received.\n\nThank you for shopping with us!\n\n- Jai Sweets`,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Order email sent:', info.response)
  } catch (error) {
    console.error('❌ Error sending email:', error)
  }
}
