import mongoose from 'mongoose'
import Village from './Village.js'

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
  villages: [Village.schema],
})

const District = mongoose.model('District', districtSchema)

export default District
