import mongoose from 'mongoose'

// Finds a studentDeliverable by _id. Joins a student's Profile. Joins parent Deliverable.
function findByIdAndJoinProfileAndDeliverable(sdId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(sdId) } },
    { $lookup: { from: 'profiles', localField: 'profile', foreignField: '_id', as: 'profile' } },
    { $lookup: { from: 'deliverables', localField: 'deliverable', foreignField: '_id', as: 'deliverable' } },
    {
      $project: {
        status: 1,
        gradedBy: 1,
        codeblock: 1,
        gradingNotes: 1,
        hasNewStatus: 1,

        cohort: 1,

        miscUrl: 1,
        gitHubUrl: 1,
        trelloUrl: 1,
        deploymentUrl: 1,
        codeSandboxUrl: 1,

        name: { $first: "$deliverable.name" },
        dueDate: { $first: "$deliverable.dueDate" },
        deliverableId: { $first: "$deliverable._id" },
        notionUrl: { $first: "$deliverable.notionUrl" },

        hasQuiz: { $first: "$deliverable.hasQuiz" },
        hasMiscUrl: { $first: "$deliverable.hasMiscUrl" },
        hasGitHubUrl: { $first: "$deliverable.hasGitHubUrl" },
        hasTrelloUrl: { $first: "$deliverable.hasTrelloUrl" },
        hasDeploymentUrl: { $first: "$deliverable.hasDeploymentUrl" },
        hasCodeSandboxUrl: { $first: "$deliverable.hasCodeSandboxUrl" },

        profile: { $arrayElemAt: ["$profile", 0] },
      }
    }
  ])
}

export {
  findByIdAndJoinProfileAndDeliverable,
}