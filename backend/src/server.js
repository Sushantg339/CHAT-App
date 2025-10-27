import express from 'express'
import {config} from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
config()
const app = express()

const PORT = process.env.PORT || 3000

app.use('/api/auth' , authRoutes)
app.use('/api/message' , messageRoutes)

app.listen(PORT , ()=>{console.log('Server is running on port' + PORT)})