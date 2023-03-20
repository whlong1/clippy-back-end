import mongoose from 'mongoose'

import * as studentDeliverableSchemaMethods from './methods.js'

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
  cohort: {
    type: mongoose.Types.ObjectId, ref: 'Cohort',
  },
  hasNewStatus: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

studentDeliverableSchema.statics = studentDeliverableSchemaMethods
const StudentDeliverable = mongoose.model('StudentDeliverable', studentDeliverableSchema)

export { StudentDeliverable }