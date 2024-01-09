import mongoose from 'mongoose'

const PartySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
    },
  ],
})

const Party = mongoose.model('Party', PartySchema)

export default Party
