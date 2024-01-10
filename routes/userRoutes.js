import express from 'express'
import userController from '../controllers/userController.js'
import { protectUserRoute } from '../middlewares/protectRoute.js'

const router = express.Router()

router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)

// route validBallots
router.post(
  '/validBallots',
  protectUserRoute,
  userController.addVotesToValidBallots
)
router.put(
  '/validBallots',
  protectUserRoute,
  userController.updateVotesToValidBallots
)

// route invalidBallots
router.patch(
  '/invalidBallots',
  protectUserRoute,
  userController.addVoteToInvalidBallots
)

export default router
