import mongoose from 'mongoose'

const squadSchema = new mongoose.Schema({
  title: {
    type: String
  },
  swatch: {
    type: String
  },
  students: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
}, {
  timestamps: true
})

const Squad = mongoose.model('Squad', squadSchema)

export { Squad }