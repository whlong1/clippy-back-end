import { Cohort } from '../models/cohort/cohort.js'
import { Profile } from '../models/profile.js'

const cohortCompositionStrings = [
  "ias",
  "tas",
  "students",
  "waitlist",
  "inactive",
  "instructors",
]

async function create(req, res) {
  // Add admin check
  try {
    const cohort = await Cohort.create(req.body)
    res.status(200).json(cohort)
  } catch (err) {
    console.log(err)
  }
}

async function index(req, res) {
  try {
    const cohorts = await Cohort.find({})
      .sort({ endDate: 'desc' }).select('name')
    res.status(200).json(cohorts)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function update(req, res) {
  // Add admin check
  // When do we need to update a cohort?
  // What properties do we need in response?
  try {
    const { cohortId } = req.params
    const cohort = await Cohort.findByIdAndUpdate(cohortId, req.body)
    res.status(200).json(cohort)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function indexPeople(req, res) {
  try {
    const cohort = await Cohort.findCohortAndPeople(req.params.cohortId)
    res.status(200).json(cohort[0])
  } catch (err) {
    res.status(500).json(err)
  }
}

async function addProfileToWaitlist(req, res) {
  try {
    const { cohortId, profileId } = req.params
    const isProfileInCohort = await checkProfileInCohort(cohortId, profileId)

    if (isProfileInCohort) {
      return res.status(500).json({ msg: 'Profile already in cohort' })
    }

    await Cohort.updateOne(
      { _id: cohortId },
      { $push: { waitlist: profileId } },
    )

    res.status(200).json({ msg: 'OK' })
  } catch (err) {
    res.status(500).json(err)
  }
}

async function approveProfile(req, res) {
  try {
    // EG: { formerRole: "waitlist", newRole: "ias" }
    // Can be used to reinstate student as well. 
    const { formerRole, newRole } = req.body
    const { cohortId, profileId } = req.params
    await Promise.all([
      Cohort.updateOne(
        { _id: cohortId },
        { $pull: { [formerRole]: profileId } },
      ),
      Cohort.updateOne(
        { _id: cohortId },
        { $addToSet: { [newRole]: profileId } }
      )
    ])
    res.status(200).json({ msg: 'OK' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function denyProfile(req, res) {
  try {
    const { cohortId, profileId } = req.params
    await Cohort.updateOne(
      { _id: cohortId },
      { $pull: { waitlist: profileId } },
    )
    res.status(200).json({ msg: 'OK' })
  } catch (err) {
    res.status(500).json(err)
  }
}

async function removeProfile(req, res) {
  try {
    const { role } = req.body
    const { cohortId, profileId } = req.params
    await Promise.all([
      Cohort.updateOne(
        { _id: cohortId },
        { $pull: { [role]: profileId } },
      ),
      Cohort.updateOne(
        { _id: cohortId },
        { $addToSet: { inactive: profileId } }
      )
    ])
    res.status(200).json({ msg: 'OK' })
  } catch (err) {
    res.status(500).json(err)
  }
}

async function changeRole(req, res) {
  try {
    // EG: { newGroup: "ias", oldGroup: "tas", newRole: 900 }
    const { cohortId, profileId } = req.params
    const { newGroup, oldGroup, newRole } = req.body
    await Promise.all([
      Profile.updateOne(
        { _id: profileId },
        { role: newRole }
      ),
      Cohort.updateOne(
        { _id: cohortId },
        { $pull: { [oldGroup]: profileId } },
      ),
      Cohort.updateOne(
        { _id: cohortId },
        { $addToSet: { [newGroup]: profileId } }
      )
    ])
    res.status(200).json({ msg: 'OK' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

// Look into findProfileCohortsRelationships & scrub helper functions
// Might want to find current role of a profile, and use that in place of oldGroup

// ====== HELPERS ====== 

async function checkProfileInCohort(cohortId, profileId) {
  let profileInCohort = false
  const cohort = await Cohort.findById(cohortId)
  cohortCompositionStrings.forEach(role => {
    if (cohort[role].some(r => r._id.equals(profileId))) {
      profileInCohort = true
    }
  })
  return profileInCohort
}


export {
  index,
  create,
  update,
  changeRole,
  indexPeople,
  denyProfile,
  removeProfile,
  approveProfile,
  addProfileToWaitlist,
}