import { Profile } from '../models/profile/profile.js'
import { Cohort } from '../models/cohort/cohort.js'
import { Attendance } from '../models/attendance/attendance.js'
import { Deliverable } from '../models/deliverable/deliverable.js'
import { StudentDeliverable } from '../models/studentDeliverable/studentDeliverable.js'

async function updateProfile(req, res) {
  try {

    if (!req.body.preferredName) {
      req.body.preferredName = req.body.firstName
    }

    const { preferredName, lastName } = req.body
    const normalizedName = `${preferredName.toLowerCase()} ${lastName.toLowerCase()}`

    req.body.isProfileComplete = true
    req.body.normalizedName = normalizedName

    // The 'user_id' value we need can be found on req.auth.sub:
    const profile = await Profile.findOneAndUpdate(
      { user_id: req.auth.sub }, req.body, { new: true }
    )

    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const { cohortId } = req.query
    const { profileId } = req.params

    const fields = {
      email: 1,
      lastName: 1,
      firstName: 1,
      isWithdrawn: 1,
      preferredName: 1,
      gitHubUserName: 1,
      linkedInUserName: 1,
      codeWarsUserName: 1,
      preferredPronouns: 1,
      isApprovalPending: 1,
    }

    const [currentRole, profile] = await Promise.all([
      findCurrentRole(cohortId, profileId),
      Profile.findById(profileId).select(fields).lean()
    ])

    res.status(200).json({ ...profile, role: currentRole })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function getMyProfile(req, res) {
  try {
    // The 'user_id' value we need can be found on req.auth.sub:
    const profile = await Profile.findOne({ user_id: req.auth.sub })
    if (profile) {
      res.status(200).json(profile)
    } else {
      throw Error('Profile not found!')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function getAllMyAttendance(req, res) {
  try {
    // Add check for no attendance - return msg?
    // Do we need to sort these in any particular way?
    // Double check how this functions for returning students.

    const { sub } = req.auth
    const { cohortId } = req.query
    const { profileId } = req.params

    // Find profile of user who issued request:
    const profile = Profile.findOne({ user_id: sub }).select('_id')

    // Confirm match between requesting user and params:
    if (profile._id !== profileId) {
      return res.status(401).json({ err: 'Not Authorized' })
    }

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
  } catch (err) {
    res.status(500).json(err)
  }
}

// A student's profile has a deliverables array (references to studentDeliverables)
// When a student views the list of deliverables, they need THEIR OWN studentDeliverables
// Joins can occur through profile (more efficient, added layer of security)

async function getAllMyDeliverables(req, res) {
  try {
    const { profileId } = req.params
    const [profile] = await Profile.findByIdAndJoinDeliverables(profileId)
    res.status(200).json(profile.deliverables)
  } catch (err) {
    res.status(500).json(err)
  }
}


// Helpers

async function findCurrentRole(cohortId, profileId) {
  const selectedFields = { _id: 1 }
  const isProfileInArray = (p) => p._id.equals(profileId)
  const [roles] = await Cohort.joinAllProfiles(cohortId, selectedFields)

  for (const role in roles) {
    if (Array.isArray(roles[role]) && roles[role].some(isProfileInArray)) {
      return role
    }
  }

}


export {
  show,
  getMyProfile,
  updateProfile,
  getAllMyAttendance,
  getAllMyDeliverables,
}
