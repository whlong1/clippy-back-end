import { Cohort } from '../models/cohort/cohort.js'


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
    await Cohort.updateOne({ _id: cohortId }, { $push: { waitlist: profileId } })
    res.status(200).json({ msg: 'OK' })
  } catch (err) {
    res.status(500).json(err)
  }
}


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
  indexPeople,
  addProfileToWaitlist,
}
