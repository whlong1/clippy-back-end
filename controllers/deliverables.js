import { Profile } from '../models/profile.js'
import { Cohort } from '../models/cohort/cohort.js'
import { Deliverable } from '../models/deliverable/deliverable.js'
import { StudentDeliverable } from '../models/studentDeliverable.js'

async function create(req, res) {
  try {
    // Toggle 'hasBlank' values to booleans
    for (const key in req.body) {
      if (key.startsWith('has')) req.body[key] = !!req.body[key]
    }

    // Method returns students and inactive from cohort document
    const [cohort] = await Cohort.joinStudentProfiles(req.body.cohort)
    const deliverable = await Deliverable.create(req.body)

    // If we need to sort by normalizedName, do so here:
    const mergedStudents = [...cohort.students, ...cohort.inactive]

    // Create an array of studentDeliverable form data for 
    // each person in cohort.students and cohort.inactive:
    const sdFormDataArray = mergedStudents.map((student) => {
      return {
        profile: student._id,
        deliverable: deliverable._id,
        status: student.isWithdrawn ? 'missing' : 'assigned'
      }
    })

    // Insert many studentDeliverable documents into collection (returns an array)
    const studentDeliverables = await StudentDeliverable.insertMany(sdFormDataArray)

    // Store studentDeliverable _id in Deliverable and each student's Profile
    for (const sdInstance of studentDeliverables) {
      deliverable.students.push(sdInstance._id)
      await Profile.updateOne(
        { _id: sdInstance.profile },
        { $addToSet: { deliverables: sdInstance._id } }
      )
    }

    // Add new deliverable to cohort and save deliverable
    await Promise.all([
      deliverable.save(),
      Cohort.updateOne(
        { _id: req.body.cohort },
        { $addToSet: { deliverables: deliverable._id } }
      ),
    ])

    res.status(200).json(deliverable)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function index(req, res) {
  try {
    const { cohortId } = req.query
    const deliverables = await Deliverable.findByCohortAndJoinStatus(cohortId)
    res.status(200).json(deliverables)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function grade(req, res) {
  // Admin check
  try {
    const { sdId } = req.params
    const studentDeliverable = await StudentDeliverable.findByIdAndUpdate(
      sdId, req.body, { new: true }
    )
    res.status(200).json(studentDeliverable)
  } catch (err) {
    res.status(500).json(err)
  }
}

// How does hasNewStatus factor in here?
// Do we want any validation on submitted links here?
// Can the response be an 'OK' msg or simply the status?
// Shouldn't the status always switch to pendingAudit on submit?
async function submit(req, res) {
  try {
    const { sdId } = req.params

    req.body.status = req.body.status === 'assigned'
      ? 'pendingAudit'
      : req.body.status

    // Refactor for auth0:
    // if (req.body.profile === req.user.profile) { }

    const studentDeliverable = await StudentDeliverable.findByIdAndUpdate(
      sdId, req.body, { new: true }
    )

    res.status(200).json(studentDeliverable)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {



    res.status(200).json(deliverable)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
 }


// show functionality
// delete
// do we need distinct show functions?
// 


export {
  index,
  show,
  grade,
  create,
  submit,
}

