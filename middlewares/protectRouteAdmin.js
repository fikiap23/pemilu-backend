import Admin from '../models/adminModel.js'
import jwt from 'jsonwebtoken'

const protectRouteAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const admin = await Admin.findById(decoded.adminId).select('-password')

    req.admin = admin

    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.log('Error in protectRoute: ', err.message)
  }
}

export default protectRouteAdmin
