import jwt from 'jsonwebtoken'
import { ENV } from '../lib/env.js'
import User from '../models/user.model.js'
export const authMiddleware = async (req,res , next)=>{
    try {
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message : "unauthorised. no token provided!"})
        }

        const decoded = jwt.verify(token , ENV.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json({message : "unauthorised. no token provided!"})
        }

        const user = await User.findById(decoded.userId)

        if(!user){
            return res.status(400).json({
                message : "user not found"
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log('error in authMiddleware:', error)
        res.status(500).json({message : "internal server error"})
    }
}