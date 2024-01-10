import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)

export default router
