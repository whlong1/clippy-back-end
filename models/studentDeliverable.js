import mongoose from 'mongoose'

const studentDeliverableSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Types.ObjectId, ref: 'Profile',
    required: true
  },
  status: {
    type: String,
    enum: ['assigned', 'complete', 'incomplete', 'missing', 'pendingAudit'],
    default: 'assigned'
  },
  gradedBy: {
    type: String
  },
  gradingNotes: {
    type: String
  },
  codeblock: {
    type: String
  },
  gitHubUrl: {
    type: String,
  },
  trelloUrl: {
    type: String,
  },
  deploymentUrl: {
    type: String,
  },
  codeSandboxUrl: {
    type: String,
  },
  miscUrl: {
    type: String,
  },
  deliverable: {
    type: mongoose.Types.ObjectId, ref: 'Deliverable',
  },
  hasNewStatus: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const StudentDeliverable = mongoose.model('StudentDeliverable', studentDeliverableSchema)

export { StudentDeliverable }