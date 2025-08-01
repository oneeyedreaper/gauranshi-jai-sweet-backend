import express from 'express'
import Razorpay from 'razorpay'
import dotenv from 'dotenv';

dotenv.config();

const productRouter = express.Router()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

productRouter.post('/create-order', async (req, res) => {
    try {
        const {amount, currency='INR', receipt} = req.body

        const order = await razorpay.orders.create({
            amount,
            currency,
            receipt
        })
        res.json(order)
    }
    catch (error) {
        console.error(error)
    }
})

productRouter.post('/verify', async (req, res) => {
    const { paymentId } = req.body
    res.json({
        success: true,
        paymentId
    })
})

export default productRouter