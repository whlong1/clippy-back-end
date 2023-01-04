import mongoose from 'mongoose'

function findByIdAndJoinProfiles(attendanceId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(attendanceId) } },
    { $unwind: { path: "$students", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "profiles",
        as: 'students.profile',
        let: { studentId: "$students.studentId" },
        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$studentId'] } } }],
      }
    },
    {
      $group: {
        _id: "$_id",
        time: { $first: "$time" },
        date: { $first: "$date" },
        notes: { $first: "$notes" },
        cohort: { $first: "$cohort" },
        takenBy: { $first: "$takenBy" },
        students: {
          $push: {
            _id: "$students._id",
            status: "$students.status",
            studentId: "$students.studentId",
            photo: { $first: "$students.profile.photo" },
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
    { $sort: { "students.normalizedName": 1 } }
  ])
}

export {
  findByIdAndJoinProfiles
}

