import mongoose from 'mongoose'
import * as profileSchemaMethods from './methods.js'

const profileSchema = new mongoose.Schema({

  // Auth0 stage:
  user_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },

  // Onboarding stage:
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
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  isApprovalPending: {
    type: Boolean,
    default: false
  },
  isOnboarded: {
    type: Boolean,
    default: false
  },
  isWithdrawn: {
    type: Boolean,
    default: false
  },
  squad: {
    type: String,
    default: 'black'
  },
  cohort: {
    type: mongoose.Types.ObjectId, ref: 'Cohort',
  },
  deliverables: [{ type: mongoose.Types.ObjectId, ref: 'StudentDeliverable' }],
}, {
  timestamps: true,
})

profileSchema.statics = profileSchemaMethods
const Profile = mongoose.model('Profile', profileSchema)

export { Profile }