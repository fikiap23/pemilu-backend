import mongoose from 'mongoose'
const VillageSchema = mongoose.Schema(
  {
    village_name: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
)

const DistrictSchema = mongoose.Schema(
  {
    district_name: {
      type: String,
      required: true,
    },

    villages: [VillageSchema],
  },
  { timestamps: true }
)

const RegencySchema = mongoose.Schema(
  {
    regency_name: {
      type: String,
      required: true,
    },

    districts: [DistrictSchema],
  },
  { timestamps: true }
)

const Region = mongoose.model('Region', RegencySchema)

export default Region
