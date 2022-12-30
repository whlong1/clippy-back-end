import { Profile } from '../models/profile.js'
import { Cohort } from '../models/cohort/cohort.js'
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

// async function getStudentAttendance(req, res) {
//   try {
//     // Check for match between requester and params
//     // Do we need to sort these in any particular way?
//     // Double check how this functions for returning students.
//     const { cohortId, profileId } = req.params
//     const attendance = await Attendance.find(
//       { cohort: cohortId },
//       {
//         time: 1,
//         date: 1,
//         cohort: 1,
//         students: { $elemMatch: { studentId: profileId } },
//       }
//     )
//     res.status(200).json(attendance)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }


async function getMyAttendance(req, res) {
  try {


  } catch (error) {
    console.log(error)
  }
}


async function getMyDeliverables(req, res) {
  try {


  } catch (error) {
    console.log(error)
  }
}

export {
  index,
  getMyAttendance,
  getMyDeliverables,
}
