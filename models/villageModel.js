import mongoose from 'mongoose'

const { Schema } = mongoose

const villageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  total_votes_subdistrict: {
    type: Number,
    required: true,
  },
})

const Village = mongoose.model('Village', villageSchema)

export default Village
