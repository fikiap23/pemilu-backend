import express from 'express'
import userController from '../controllers/userController.js'
import { protectUserRoute } from '../middlewares/protectRoute.js'

const router = express.Router()

router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.post(
  '/addValidBallots',
  protectUserRoute,
  userController.addVotesToValidBallots
)

export default router
