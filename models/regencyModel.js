import mongoose from 'mongoose'

const RegencySchema = mongoose.Schema({
  regency_name: {
    type: String,
    required: true,
  },

  districts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
    },
  ],
})

const Regency = mongoose.model('Regency', RegencySchema)

export default Regency
