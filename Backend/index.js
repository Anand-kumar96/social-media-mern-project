//starting point of server
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

//Routes
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const uploadRouter = require('./routes/uploadRoutes')
const chatRouter = require('./routes/chatRoutes')
const messageRouter =require('./routes/messageRoutes')

const app = express()
// to serve images for public
// app.use(express.static('public'));
// app.use('/images',express.static('images'))
app.use(express.static('public'))
app.use('/images', express.static('images'))
//Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
dotenv.config()
app.use(cors()) // to work app in cross origin

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection is established'))
  .catch((err) => {
    throw err
  })
app.listen(process.env.PORT, () =>
  console.log(`server is listening.. at port: ${process.env.PORT}`)
)

//uses of routes
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/upload', uploadRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)
