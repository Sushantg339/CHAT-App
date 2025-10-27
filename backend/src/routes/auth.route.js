import express from 'express'
import { signupController , loginController, logoutController , updateProfileController} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { arcjetProtection } from '../controllers/arcjet.middleware.js'

const router = express.Router()

router.use(arcjetProtection)

router.post('/signup' , signupController)

router.post('/login' , loginController)

router.post('/logout' , logoutController)
router.post('/update-profile' ,authMiddleware, updateProfileController)

router.get('/check' , authMiddleware , (req,res)=>{res.status(200).json( req.user)})

export default router