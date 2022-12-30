import mongoose from 'mongoose'
import * as deliverableSchemaMethods from './methods.js'

const deliverableSchema = new mongoose.Schema({
  cohort: {
    type: mongoose.Types.ObjectId, ref: 'Cohort',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  notionUrl: {
    type: String,
    required: true
  },
  hasGitHubUrl: {
    type: Boolean,
    default: false
  },
  hasTrelloUrl: {
    type: Boolean,
    default: false
  },
  hasDeploymentUrl: {
    type: Boolean,
    default: false
  },
  hasCodeSandboxUrl: {
    type: Boolean,
    default: false
  },
  hasMiscUrl: {
    type: Boolean,
    default: false
  },
  students: [{ type: mongoose.Types.ObjectId, ref: 'StudentDeliverable' }],
}, {
  timestamps: true,
})

deliverableSchema.statics = deliverableSchemaMethods
const Deliverable = mongoose.model('Deliverable', deliverableSchema)

export { Deliverable }