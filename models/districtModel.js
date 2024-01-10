import mongoose from 'mongoose'

const DistrictSchema = mongoose.Schema({
  district_name: {
    type: String,
    required: true,
  },

  regencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Regency',
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
