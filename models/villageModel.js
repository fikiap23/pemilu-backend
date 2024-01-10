import mongoose from 'mongoose'

const VillageSchema = mongoose.Schema({
  village_name: {
    type: String,
    required: true,
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
  },
  total_voters: {
    type: Number,
    required: true,
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
})

const Village = mongoose.model('Village', VillageSchema)
export default Village
