import mongoose from 'mongoose'

function findByCohortAndJoinStatus(cohortId) {
  return this.aggregate([
    { $match: { cohort: mongoose.Types.ObjectId(cohortId) } },
    { $lookup: { from: 'studentdeliverables', localField: 'students', foreignField: '_id', as: 'students' } },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        name: 1,
        dueDate: 1,
        students: { _id: 1, status: 1, profile: 1 }
      }
    }
  ])
}

function findByIdAndJoinStudents(deliverableId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(deliverableId) } },
    { $lookup: { from: 'studentdeliverables', localField: 'students', foreignField: '_id', as: 'students' } },
    { $unwind: { path: "$students" } },
    { $lookup: { from: 'profiles', localField: 'students.profile', foreignField: '_id', as: 'students.profile' } },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        cohort: { $first: "$cohort" },
        dueDate: { $first: "$dueDate" },
        notionUrl: { $first: "$notionUrl" },
        hasMiscUrl: { $first: "$hasMiscUrl" },
        hasTrelloUrl: { $first: "$hasTrelloUrl" },
        hasGitHubUrl: { $first: "$hasGitHubUrl" },
        hasDeploymentUrl: { $first: "$hasDeploymentUrl" },
        hasCodeSandboxUrl: { $first: "$hasCodeSandboxUrl" },
        students: {
          $push: {
            _id: "$students._id",
            status: "$students.status",
            profileId: { $first: "$students.profile._id" },
            lastName: { $first: "$students.profile.lastName" },
            firstName: { $first: "$students.profile.firstName" },
            preferredName: { $first: "$students.profile.preferredName" },
            normalizedName: { $first: "$students.profile.normalizedName" },
            gitHubUserName: { $first: "$students.profile.gitHubUserName" },
            // Additional fields from the profile can be specified here.
          },
        },
      },
    },
  ])
}

export {
  findByIdAndJoinStudents,
  findByCohortAndJoinStatus,
}


