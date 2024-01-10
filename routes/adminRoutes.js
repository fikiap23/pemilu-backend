import express from 'express'
import adminController from '../controllers/adminController.js'
import { protectAdminRoute } from '../middlewares/protectRoute.js'

const router = express.Router()

router.post('/signup', adminController.signupUser)
router.post('/login', adminController.loginUser)
router.post('/logout', adminController.logoutUser)
router.post(
  '/createVillage',
  protectAdminRoute,
  adminController.createNewVillage
)
router.post('/createParty', protectAdminRoute, adminController.createNewParty)
router.post('/createUser', protectAdminRoute, adminController.createNewUser)

export default router
