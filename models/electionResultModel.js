import mongoose from 'mongoose'
import Regency from './Regency.js'

const { Schema } = mongoose

const electionResultSchema = new Schema(
  {
    nomor_urut: {
      type: Number,
      required: true,
    },
    name_candidate_1: {
      type: String,
      required: true,
    },
    name_candidate_2: {
      type: String,
      required: true,
    },
    results_regency: [Regency.schema],
    total_votes: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

const ElectionResult = mongoose.model('ElectionResult', electionResultSchema)

export default ElectionResult
