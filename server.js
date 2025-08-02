import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './config/db.js'
import router from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import productRouter from './routes/productRoute.js'
import orderRouter from './routes/orderRoute.js'
import restaurantRouter from './routes/restaurantRoute.js'
import notificationRoutes from './routes/notificationRoutes.js'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config();

const app = express()
const port = 4000

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methos: ['GET', 'POST']
    }
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))

connectDB()

app.use('/api/food', router)
app.use('/uploads', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/payment', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/notifications', notificationRoutes)

app.get('/', (req, res) => {
    res.send("API Working")
})

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id)
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id)
    })
})

app.set('io', io)

app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`)
})