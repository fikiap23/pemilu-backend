import mongoose from 'mongoose'

const RegencySchema = mongoose.Schema({
  regency_name: {
    type: String,
    required: true,
  },

  total_voters: {
    type: Number,
  },
  valid_ballots: [
    {
      partyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party',
      },
      numberOfVotes: {
        type: Number,
        default: 0,
      },
    },
  ],
  invalid_ballots: {
    type: Number,
    default: 0,
  },

  districts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
    },
  ],
})

const Regency = mongoose.model('Regency', RegencySchema)

export default Regency
