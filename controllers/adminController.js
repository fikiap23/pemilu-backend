import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'
import Village from '../models/villageModel.js'
import Party from '../models/partyModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'

const adminController = {
  signupUser: async (req, res) => {
    try {
      // property yg ada di req.body
      const { username, password, repassword } = req.body

      // cek apakah user ada di db
      const admin = await Admin.findOne({ username: username })
      if (admin) {
        return res.status(400).json({ error: 'Admin already exists' })
      }

      // cek apakah password dan repassword sama
      if (password !== repassword) {
        return res.status(400).json({ error: 'Passwords do not match' })
      }

      // encrypt password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // buat Admin baru
      const newAdmin = new Admin({
        username,
        password: hashedPassword,
      })
      await newAdmin.save()

      // buat response
      if (newAdmin) {
        // generate token
        generateTokenAndSetCookie(newAdmin._id, res)
        res.status(201).json({
          _id: newAdmin._id,
          username: newAdmin.username,
        })
      } else {
        res.status(400).json({ error: 'Invalid user data' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
      console.log('error di signup', error.message)
    }
  },
  loginUser: async (req, res) => {
    try {
      let { username, password } = req.body // 'username' can be either username or email
      username = username.toLowerCase()
      const admin = await Admin.findOne({ username: username })

      const isPasswordCorrect = await bcrypt.compare(
        password,
        admin?.password || ''
      )

      if (!admin || !isPasswordCorrect)
        return res.status(400).json({ error: 'Invalid username or password' })

      generateTokenAndSetCookie(admin._id, 'admin', res)

      res.status(200).json({
        _id: admin._id,
        name: admin.name,
        username: admin.username,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
      console.log('Error in loginUser: ', error.message)
    }
  },

  logoutUser: (req, res) => {
    try {
      res.cookie('jwt', '', { maxAge: 1 })
      res.status(200).json({ message: 'User logged out successfully' })
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log('Error in logout: ', err.message)
    }
  },
  createNewUser: async (req, res) => {
    try {
      const { username, password, villageId } = req.body

      // Check if the user already exists
      const existingUser = await User.findOne({ username })
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' })
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Create new user
      const newUser = new User({
        username,
        password: hashedPassword,
        villageId,
      })
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        villageId: newUser.villageId,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
      console.log('Error in createNewUser: ', error.message)
    }
  },

  createNewVillage: async (req, res) => {
    try {
      let { village_name, total_voters, disterict } = req.body

      // Validate input
      if (!village_name || !total_voters || !disterict) {
        return res.status(400).json({ error: 'Missing required fields' })
      }
      village_name = village_name.toLowerCase()

      // Check if the village already exists
      const existingVillage = await Village.findOne({ village_name })
      if (existingVillage) {
        return res.status(400).json({ error: 'Village already exists' })
      }

      // Create new village
      const newVillage = new Village({
        disterict,
        village_name,
        total_voters,
      })
      await newVillage.save()

      res.status(201).json({
        _id: newVillage._id,
        disterict: newVillage.disterict,
        village_name: newVillage.village_name,
        total_voters: newVillage.total_voters,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
      console.log('Error in createNewVillage: ', error.message)
    }
  },

  createNewParty: async (req, res) => {
    try {
      let { name, code, path } = req.body

      // Validate input
      if (!name || !code || !path) {
        return res.status(400).json({ error: 'Missing required fields' })
      }
      name = name.toLowerCase()
      code = code.toLowerCase()

      // Check if the party already exists
      const existingParty = await Party.findOne({ code })
      if (existingParty) {
        return res.status(400).json({ error: 'Party already exists' })
      }

      // Create new party
      const newParty = new Party({
        name,
        code,
        path,
      })
      await newParty.save()

      res.status(201).json({
        _id: newParty._id,
        name: newParty.name,
        path: newParty.path,
        code: newParty.code,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
      console.log('Error in createNewParty: ', error.message)
    }
  },
}

export default adminController
