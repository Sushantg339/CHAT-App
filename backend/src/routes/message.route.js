import express from 'express'

const router = express.Router()

router.get('/send' , (req,res)=>{
    res.send("send message endpoinr")
})

router.get('/recieve' , (req,res)=>{
    res.send("recieve message endpoinr")
})


export default router