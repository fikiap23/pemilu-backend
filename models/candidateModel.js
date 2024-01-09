import mongoose from 'mongoose'

const CandidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number_in_party: {
    type: Number,
    required: true,
  },
})

const Candidate = mongoose.model('Candidate', CandidateSchema)

export default Candidate
