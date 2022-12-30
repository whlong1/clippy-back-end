import { Profile } from '../models/profile/profile.js'
import { Cohort } from '../models/cohort/cohort.js'
import { Attendance } from '../models/attendance/attendance.js'
import { Deliverable } from '../models/deliverable/deliverable.js'
import { StudentDeliverable } from '../models/studentDeliverable/studentDeliverable.js'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (error) {
    console.log(error)
  }
}

// Index deliverables for student view
// A student's profile has a deliverables array (references studentDeliverables)
// Something like get deliverables by profileId

// getStudentDeliverablesByProfile
// Profiles could have a getMyAttendance, getMyDeliverables

// Get student attendance doesn't make sense for this routing pattern anyway
// router.get('/:cohortId/:profileId', attendanceCtrl.getStudentAttendance)


// When a student views the list of deliverables, they need THEIR OWN studentDeliverables
// Joins can occur through profile.


async function getMyAttendance(req, res) {
  try {
    // Refactor to extra profileId from req.auth
    // Check for match between requester and params
    // Do we need to sort these in any particular way?
    // Double check how this functions for returning students.

    const { cohortId } = req.query
    const { profileId } = req.params
    const attendance = await Attendance.find(
      { cohort: cohortId },
      {
        time: 1,
        date: 1,
        cohort: 1,
        students: { $elemMatch: { studentId: profileId } },
      }
    )
    res.status(200).json(attendance)

  } catch (error) {
    res.status(500).json(err)
  }
}


async function getMyDeliverables(req, res) {
  try {


  } catch (error) {
    res.status(500).json(err)
  }
}

export {
  index,
  getMyAttendance,
  getMyDeliverables,
}
