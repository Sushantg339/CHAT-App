import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
export const signupController = async(req , res)=>{
    const {fullName , email , password} = req.body

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({
                message : "all fields are required"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message : "password should be atleast 6 characters"
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) return res.status(400).json({message : "invalid email format"})
        
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message : "email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new User({
            email , 
            fullName ,
            password : hashedPassword
        })

        if(newUser){
            generateToken(newUser._id , res)
            await newUser.save()

            res.status(201).json({
                message : "user created successfully",
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email
            })

        }else{
            res.status(400).json({
                message : "invalid user data"
            })
        }
    } catch (error) {
        console.log('error in signup controller : ',error)
        res.status(500).json({
            message : "internal server error"
        })
    }
}