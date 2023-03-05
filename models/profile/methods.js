import mongoose from 'mongoose'

function findByIdAndJoinDeliverables(profileId) {
  return this.aggregate([
    // Find the profile
    { $match: { _id: mongoose.Types.ObjectId(profileId) } },
    // Join studentdeliverables with profile doc
    { $lookup: { from: 'studentdeliverables', localField: 'deliverables', foreignField: '_id', as: 'deliverables' } },
    // Unwind array of joined studentdeliverables
    { $unwind: { path: "$deliverables" } },
    // Join studentDeliverables with deliverables (necessary in order to display name and dueDate)
    { $lookup: { from: 'deliverables', localField: 'deliverables.deliverable', foreignField: '_id', as: 'deliverables.deliverable' } },
    // Group docs by profile (_id field is necessary for grouping stage)
    {
      $group: {
        _id: "$_id",
        deliverables: {
          $push: {
            // Necessary properties for list view:
            _id: "$deliverables._id",
            status: "$deliverables.status",
            name: { $first: "$deliverables.deliverable.name" },
            dueDate: { $first: "$deliverables.deliverable.dueDate" },

            // Expanded props (potential use for icons/indicators)
            hasQuiz: { $first: "$deliverables.deliverable.hasQuiz" },
            notionUrl: { $first: "$deliverables.deliverable.notionUrl" },
            hasMiscUrl: { $first: "$deliverables.deliverable.hasMiscUrl" },
            hasTrelloUrl: { $first: "$deliverables.deliverable.hasTrelloUrl" },
            hasGitHubUrl: { $first: "$deliverables.deliverable.hasGitHubUrl" },
            hasDeploymentUrl: { $first: "$deliverables.deliverable.hasDeploymentUrl" },
            hasCodeSandboxUrl: { $first: "$deliverables.deliverable.hasCodeSandboxUrl" },
          },
        },
      },
    },
  ])
}

export {
  findByIdAndJoinDeliverables
}


