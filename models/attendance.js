import mongoose from 'mongoose'

const studentStatusSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId, ref: 'Profile',
    required: true
  },
  status: {
    type: String,
    enum: ['P', 'A', 'L', 'W', 'EC', 'SC', 'H'],
    default: 'P'
  }
}, {
  timestamps: true
})

const attendanceSchema = new mongoose.Schema({
  cohort: {
    type: mongoose.Types.ObjectId, ref: 'Cohort'
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    enum: ['AM', 'PM']
  },
  notes: {
    type: String
  },
  students: [studentStatusSchema],
  takenBy: String
}, {
  timestamps: true,
})

const Attendance = mongoose.model('Attendance', attendanceSchema)

export { Attendance }