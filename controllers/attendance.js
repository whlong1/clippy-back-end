import { Attendance } from '../models/attendance.js'
import { Cohort } from '../models/cohort/cohort.js'
import { Profile } from '../models/profile.js'

async function index(req, res) {
  try {
    const { cohortId } = req.params
    const cohortAttendance = await Attendance.find({ cohort: cohortId })
    res.status(200).json(cohortAttendance)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    // Add admin check
    req.body.cohort = req.params.cohortId
    const attendance = await Attendance.create(req.body)

    await Cohort.updateOne(
      { _id: req.params.cohortId },
      { $addToSet: { attendance: attendance._id } }
    )

    res.status(200).json(attendance)
  } catch (err) {
    res.status(500).json(err)
  }
}




export {
  index,
  create,
}