import mongoose from 'mongoose'
import Regency from './Regency.js'

const { Schema } = mongoose

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  // Tambahkan informasi lain yang mungkin diperlukan untuk kandidat
})

const electionResultSchema = new Schema(
  {
    election_type: {
      type: String,
      required: true,
      default: 'legislative', // Menandakan tipe pemilihan (contoh: legislative)
    },
    total_seats: {
      type: Number,
      required: true,
    },
    candidates: [candidateSchema], // Array kandidat yang bersaing
    results_regency: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Regency',
      },
    ],
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
