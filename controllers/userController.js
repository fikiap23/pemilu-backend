import User from '../models/userModel.js'
import Village from '../models/villageModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'

const userController = {
  loginUser: async (req, res) => {
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

      generateTokenAndSetCookie(user._id, 'user', res)

      res.status(200).json({
        _id: user._id,
        villageId: user.villageId,
        username: user.username,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
      console.log('Error in loginUser: ', error.message)
    }
  },

  addVotesToValidBallots: async (req, res) => {
    try {
      const { partyId } = req.body
      const userId = req.user._id

      const user = await User.findById(userId)

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const villageId = user.villageId

      // Cek apakah partyId sudah ada di dalam array validBallots
      const village = await Village.findById(villageId)

      if (!village) {
        return res.status(404).json({ error: 'Village not found' })
      }

      const existingBallotIndex = village.valid_ballots.findIndex(
        (ballot) => String(ballot.partyId) === partyId
      )

      if (existingBallotIndex !== -1) {
        // Jika partai sudah ada, tambahkan jumlah suara
        await Village.updateOne(
          { _id: villageId, 'valid_ballots.partyId': partyId },
          { $inc: { 'valid_ballots.$.numberOfVotes': 1 } }
        )
      } else {
        // Jika partai belum ada, tambahkan partai baru ke dalam valid_ballots
        await Village.updateOne(
          { _id: villageId },
          {
            $push: {
              valid_ballots: {
                partyId,
                numberOfVotes: 1,
              },
            },
          }
        )
      }

      res.status(200).json({ message: 'Votes added successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
      console.log('Error in addVotesToValidBallots: ', error.message)
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
}

export default userController
