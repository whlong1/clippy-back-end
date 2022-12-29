import { Attendance } from '../models/attendance/attendance.js'
import { Cohort } from '../models/cohort/cohort.js'
import { Profile } from '../models/profile.js'

async function index(req, res) {
  try {
    const fields = 'date time'
    const filter = { cohort: req.query.cohortId }
    const cohortAttendance = await Attendance.find(filter, fields)
    res.status(200).json(cohortAttendance)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const { attendanceId } = req.params
    const attendance = await Attendance.findByIdAndJoinProfiles(attendanceId)
    res.status(200).json(attendance)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    // Add admin check
    const attendance = await Attendance.create(req.body)
    await Cohort.updateOne(
      { _id: req.body.cohort },
      { $addToSet: { attendance: attendance._id } }
    )
    res.status(200).json(attendance)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function getStudentAttendance(req, res) {
  try {
    // Check for match between requester and params
    // Do we need to sort these in any particular way?
    const { cohortId, profileId } = req.params
    const attendance = await Attendance.find(
      { cohort: cohortId },
      {
        students: {
          $elemMatch: { studentId: profileId }
        },
        time: 1,
        date: 1,
        cohort: 1,
      }
    )
    res.status(200).json(attendance)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    // find attendance, 
    // update all properties of attendance.
    // update embedded students resource.
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteAttendance(req, res) {
  try {

  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  show,
  index,
  create,
  update,
  deleteAttendance,
  getStudentAttendance,
}