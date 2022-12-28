import { Cohort } from '../models/cohort/cohort.js'

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

async function getCohortAndPeople(req, res) {
  try {
    const cohort = await Cohort.findCohortAndPeople(req.params.cohortId)
    res.status(200).json(cohort[0])
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  index,
  create,
  getCohortAndPeople,
}
