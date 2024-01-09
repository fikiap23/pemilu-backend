import mongoose from 'mongoose'

const { Schema } = mongoose

const regencySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  total_votes_regency: {
    type: Number,
    required: true,
  },
  districts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
    },
  ],
})

const Regency = mongoose.model('Regency', regencySchema)

export default Regency
