import mongoose from 'mongoose'

const { Schema } = mongoose

const tpsSchema = new Schema({
  tps_number: {
    type: Number,
    required: true,
  },
  total_voters: {
    type: Number,
    required: true,
  },
  valid_votes: {
    type: Number,
    required: true,
  },
  invalid_votes: {
    type: Number,
    required: true,
  },
})

const villageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  total_votes_village: {
    type: Number,
    required: true,
  },
  tps: [tpsSchema], // Menambahkan array TPS pada Village
})

const Village = mongoose.model('Village', villageSchema)

export default Village
