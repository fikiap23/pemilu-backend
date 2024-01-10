import express from 'express'
import adminController from '../controllers/adminController.js'
import protectRouteAdmin from '../middlewares/protectRouteAdmin.js'

const router = express.Router()

router.post('/signup', adminController.signupUser)
router.post('/login', adminController.loginUser)
router.post('/logout', adminController.logoutUser)
router.post(
  '/createVillage',
  protectRouteAdmin,
  adminController.createNewVillage
)
router.post('/createParty', protectRouteAdmin, adminController.createNewParty)

export default router
