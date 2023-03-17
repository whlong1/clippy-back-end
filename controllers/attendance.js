import { Attendance } from '../models/attendance/attendance.js'
import { Cohort } from '../models/cohort/cohort.js'

async function index(req, res) {
  try {
    const fields = 'date time'
    const filter = { cohort: req.query.cohortId }
    const cohortAttendance = await Attendance.find(filter, fields).sort({ date: -1 })
    res.status(200).json(cohortAttendance)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const { attendanceId } = req.params
    const [attendance] = await Attendance.findByIdAndJoinProfiles(attendanceId)
    console.log(attendance)
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

async function update(req, res) {
  try {
    // Add admin check
    const { attendanceId } = req.params
    const attendance = await Attendance.findById(attendanceId)
    for (const key in req.body) attendance[key] = req.body[key]
    await attendance.save()
    res.status(200).json(attendance)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteAttendance(req, res) {
  try {
    // Add admin check
    // return res.status(200).json({ _id: req.params.attendanceId })
    const { attendanceId } = req.params
    const attendance = await Attendance.findByIdAndDelete(attendanceId)

    await Cohort.updateOne(
      { _id: attendance.cohort },
      { $pull: { attendance: attendance._id } },
    )

    res.status(200).json(attendance)
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
}