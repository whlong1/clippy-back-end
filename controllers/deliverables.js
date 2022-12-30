import { Cohort } from '../models/cohort/cohort.js'
import { Deliverable } from '../models/deliverable.js'
import { StudentDeliverable } from '../models/studentDeliverable.js'


async function create(req, res) {
  try {
    // res.status(200).json(deliverable)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  create,
}