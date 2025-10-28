import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
export const getAllContacts = async (req , res)=>{
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({ _id : {$ne: loggedInUserId}}).select('-password')

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('error in get all contacts : ',error)
        res.status(500).json({message : "internal server error"})
    }
}

export const getMessagesByUserId = async (req , res)=>{
    try {
        const myId = req.user._id
        const {id : userToChatId} = req.params

        await Message.find({
            $or : [
                {senderId : myId , receiverId : userToChatId},
                {senderId : userToChatId , receiverId : myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log('error in get messages by user id : ',error)
        res.status(500).json({message : "internal server error"})
    }
}

export const sendMessage = async (req , res)=>{
    try {
        const {text , image} = req.body
        const {id : recieverId} = req.params
        const senderId = req.user._id

        let imageURl;
        if(image){
            //upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageURl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image : imageURl
        })

        await newMessage.save()

        res.status(201).json({message : "message sent successfully" , newMessage})
    } catch (error) {
        console.log('error in send message : ',error)
        res.status(500).json({message : "internal server error"})
    }
}


export const getChatPartners = async (req , res)=>{
    try {
        const loggedInUserId = req.user._id

        const messages = await Message.find({
            $or : [
                {senderId : loggedInUserId},
                {recieverId : loggedInUserId}
            ]
        })

        const chatPartnersId = [...new Set(messages.map(msg => msg.senderId.toString() == loggedInUserId.toString() ? msg.senderId.toString() : msg.recieverId.toString()))]

        const chatPartners = await User.find({_id : {$in : chatPartnersId}}).select('-password')

        res.status(200).json(chatPartners)
    } catch (error) {
        console.log('error in getchatPartnersId :',error)
        res.status(500).json({message : "internal server error"})
    }
}