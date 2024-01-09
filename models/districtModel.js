import mongoose from 'mongoose'

const { Schema } = mongoose

const districtSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  total_votes_district: {
    type: Number,
    required: true,
  },
  villages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Village',
    },
  ],
})

const District = mongoose.model('District', districtSchema)

export default District
