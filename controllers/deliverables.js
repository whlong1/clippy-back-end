import { Profile } from '../models/profile/profile.js'
import { Cohort } from '../models/cohort/cohort.js'
import { Deliverable } from '../models/deliverable/deliverable.js'
import { StudentDeliverable } from '../models/studentDeliverable/studentDeliverable.js'

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

async function gradeStudentDeliverable(req, res) {
  // Admin check
  try {
    const { sdId } = req.params
    req.body.hasNewStatus = true

    const studentDeliverable = await StudentDeliverable.findByIdAndUpdate(
      sdId, req.body, { new: true }
    ).select('-profile -deliverable -createdAt -updatedAt')

    res.status(200).json(studentDeliverable)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function markAllDeliverablesComplete(req, res) {
  try {
    const { deliverableId } = req.params
    req.body.hasNewStatus = true
    await StudentDeliverable.updateMany({ deliverable: deliverableId }, req.body)
    const [deliverable] = await Deliverable.findByIdAndJoinStudents(deliverableId)
    res.status(200).json(deliverable)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Do we want any validation on submitted links here?
// Shouldn't the status always switch to pendingAudit on submit?
async function submitStudentDeliverable(req, res) {
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
    res.status(500).json(err)
  }
}

// Instructor View for Deliverable
async function show(req, res) {
  try {
    // Add condition for deliverable not found?
    const { deliverableId } = req.params
    const [deliverable] = await Deliverable.findByIdAndJoinStudents(deliverableId)
    res.status(200).json(deliverable)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

// Instructor & Student View for studentDeliverable
async function showStudentDeliverable(req, res) {
  try {
    const { sdId } = req.params
    const [studentDeliverable] = await StudentDeliverable.findByIdAndJoinProfileAndDeliverable(sdId)
    res.status(200).json(studentDeliverable)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteDeliverable(req, res) {
  // Add admin check
  try {
    const { deliverableId } = req.params
    const [deliverable] = await Deliverable.findByIdAndJoinStudents(deliverableId)

    // Note: deliverable.students is an array of studentDeliverables
    // This loop can be removed by using updateMany and deleteMany
    for (const studentDeliverable of deliverable.students) {
      await Promise.all([
        Profile.updateOne(
          { _id: studentDeliverable.profileId },
          { $pull: { deliverables: studentDeliverable._id } }
        ),
        StudentDeliverable.findByIdAndDelete(studentDeliverable._id),
      ])
    }

    await Promise.all([
      Cohort.updateOne(
        { _id: deliverable.cohort },
        { $pull: { deliverables: deliverableId } }
      ),
      Deliverable.deleteOne({ _id: deliverableId }),
    ])

    res.status(200).json({ msg: 'OK' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  show,
  index,
  create,
  deleteDeliverable,
  showStudentDeliverable,
  gradeStudentDeliverable,
  submitStudentDeliverable,
  markAllDeliverablesComplete,
}