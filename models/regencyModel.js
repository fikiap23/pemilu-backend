import mongoose from 'mongoose'
import District from './District.js'

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
  districts: [District.schema],
})

const Regency = mongoose.model('Regency', regencySchema)

export default Regency
