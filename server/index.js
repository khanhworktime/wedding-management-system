require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const  authRouter = require('./routes/auth')
const  loungeRouter = require('./routes/lounge')
const  dishRouter = require('./routes/dish')
const  menuRouter = require('./routes/menu')
const  serviceRouter = require('./routes/service')
const  bookingRecordRouter = require('./routes/bookingRecord')
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@wedding-planner.r88uajw.mongodb.net/?retryWrites=true&w=majority`
        )

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/lounges', loungeRouter)
app.use('/api/dishs', dishRouter)
app.use('/api/menus', menuRouter)
app.use('/api/bookingrecords', bookingRecordRouter)

const PORT = 5000

app.listen(PORT,() => console.log(`Server started on port ${PORT}`))
