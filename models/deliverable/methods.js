import mongoose from 'mongoose'

function findByCohortAndJoinStatus(cohortId) {
  return this.aggregate([
    { $match: { cohort: mongoose.Types.ObjectId(cohortId) } },
    { $lookup: { from: 'studentdeliverables', localField: 'students', foreignField: '_id', as: 'students' } },
    {
      $project: {
        name: 1,
        dueDate: 1,
        students: { _id: 1, status: 1, profile: 1 }
      }
    }
  ])
}

export {
  findByCohortAndJoinStatus
}
