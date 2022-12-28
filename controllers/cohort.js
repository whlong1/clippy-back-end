import { Cohort } from '../models/cohort.js'

async function create(req, res) {
  // Add admin check
  try {
    const cohort = await Cohort.create(req.body)
    res.status(200).json(cohort)
  } catch (error) {
    console.log(error)
  }
}

async function index(req, res) {
  try {
    const cohorts = await Cohort.find({}).select('name')


    res.status(200).json(cohorts)
  } catch (error) {
    res.status(500).json(err)
  }
}

async function indexPeople(req, res) {
  try {
    const people = await Cohort.findById(req.params.cohortId)
    res.status(200).json(people)
  } catch (error) {
    res.status(500).json(err)
  }
}

export {
  index,
  create,
  indexPeople,
}
