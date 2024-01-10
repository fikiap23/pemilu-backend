import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'
const signupUser = async (req, res) => {
  try {
    // property yg ada di req.body
    const { username, villagaId, password, repassword } = req.body

    // cek apakah user ada di db
    const user = await User.findOne({ username: username })
    if (user) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // cek apakah password dan repassword sama
    if (password !== repassword) {
      return res.status(400).json({ error: 'Passwords do not match' })
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // buat user baru
    const newUser = new User({
      villagaId,
      username,
      password: hashedPassword,
    })
    await newUser.save()

    // buat response
    if (newUser) {
      // generate token
      generateTokenAndSetCookie(newUser._id, res)
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        villagaId: newUser.villagaId,
      })
    } else {
      res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log('error di signup', error.message)
  }
}
const loginUser = async (req, res) => {
  try {
    let { username, password } = req.body // 'username' can be either username or email
    username = username.toLowerCase()
    const user = await User.findOne({ username: username })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    )

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: 'Invalid username or password' })

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      villagaId: user.villagaId,
      username: user.username,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log('Error in loginUser: ', error.message)
  }
}

const logoutUser = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json({ message: 'User logged out successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in logout: ', err.message)
  }
}

export { signupUser, loginUser, logoutUser }
