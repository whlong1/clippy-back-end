import { Cohort } from '../models/cohort.js'

async function create(req, res) {
  try {
    const cohort = await Cohort.create(req.body)
    res.json(cohort)
  } catch (error) {
    console.log(error)
  }
}


async function indexPeople(req, res) {
  try {
    const people = await Cohort.findById(req.params.cohortId)
    res.json(people)
  } catch (error) {
    console.log(error)
  }
}

export {
  create,
  indexPeople,
}
