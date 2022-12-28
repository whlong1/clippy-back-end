import mongoose from 'mongoose'

const cohortSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  instructors: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
  ias: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
  tas: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
  students: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
  waitlist: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
  inactive: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
  attendance: [{ type: mongoose.Types.ObjectId, ref: 'Attendance' }],
  deliverables: [{ type: mongoose.Types.ObjectId, ref: 'Deliverable' }],
}, {
  timestamps: true,
})

const Cohort = mongoose.model('Cohort', cohortSchema)

export { Cohort }

