import express from 'express'
import isLogin from '../middlewares/isLogin.js'
import { getcurrentChatters, getUserBySearch } from '../routControllers/userhandlerControler.js'
const router = express.Router()

// router.post('/register', registerUser)
// router.post('/login', loginUser)
router.get('/logout', isLogin, getUserBySearch)
router.get('/currentchatters',getcurrentChatters)

export default router

