import mongoose from 'mongoose'

const DistrictSchema = mongoose.Schema({
  district_name: {
    type: String,
    required: true,
  },
  regencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Regency',
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
  villages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Village',
    },
  ],
})

const District = mongoose.model('District', DistrictSchema)

export default District
