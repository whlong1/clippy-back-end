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

}


export {
  index,
  create,
}