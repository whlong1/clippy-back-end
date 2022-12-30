import { Profile } from '../models/profile.js'
import { Cohort } from '../models/cohort/cohort.js'
import { Deliverable } from '../models/deliverable.js'
import { StudentDeliverable } from '../models/studentDeliverable.js'

// student profiles save a reference to studentDeliverable
// studentDeliverable saves a reference to that profile and parent deliverable

async function create(req, res) {
  try {
    // Toggle 'hasBlank' values to booleans
    for (const key in req.body) {
      if (key.startsWith('has')) req.body[key] = !!req.body[key]
    }

    // Find cohort by req.body.cohort
    // What we need here is the students, inactive and deliverables
    // Consider a method.
    const [cohort] = await Cohort.getDeliverablesAndJoinStudents(req.body.cohort)
    console.log(cohort)


    // create new deliverable instance
    // Deliverable.create(req.body)


    // studentDeliverable instances are created for 
    // everyone in cohort.students and everyone in cohort.inactive

    // const sdInstance = {
    //   profile: profile._id,
    //   deliverable: deliverable._id,
    //   status: student.isWithdrawn ? 'missing' : 'assigned'
    // }

    // await StudentDeliverable.insertMany()

    // Store studentDeliverable in Profile and Deliverable
    // • push newly created studentDeliverable._id into deliverable.students
    // • find each profile, push correct studentDeliverable to profile.deliverables

    // save deliverable
    // save profile

    // push new deliverable instance to cohort.deliverables array
    // save cohort

    // return new deliverable
    res.status(200).json(cohort)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  create,
}

