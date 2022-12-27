import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: String,
  photo: String,
  sub: String,

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  preferredName: {
    type: String
  },
  normalizedName: {
    type: String,
    lowercase: true
  },
  preferredPronouns: {
    type: String,
    lowercase: true
  },
  gitHubUserName: {
    type: String
  },
  linkedInUserName: {
    type: String
  },
  codeWarsUserName: {
    type: String
  },
  role: {
    type: Number,
    required: true,
    default: 100
  },
  deliverables: [{ type: mongoose.Types.ObjectId, ref: 'StudentDeliverable' }],


}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }