import mongoose from 'mongoose'

const PartySchema = mongoose.Schema({
  party_name: {
    type: String,
    required: true,
  },
  party_number: {
    type: Number,
    required: true,
  },
})

const Party = mongoose.model('Party', PartySchema)

export default Party
