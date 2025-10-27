import express from 'express'

const router = express.Router()

router.get('/signup' , (req,res)=>{
    res.send("signup endpoinr")
})

router.get('/login' , (req,res)=>{
    res.send("login endpoinr")
})

router.get('/logout' , (req,res)=>{
    res.send("logout endpoinr")
})

export default router