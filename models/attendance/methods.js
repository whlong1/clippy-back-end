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
        date: { $first: "$date" },
        students: {
          $push: {
            _id: "$students._id",
            firstName: { $first: "$students.profile.firstName" },
            lastName: { $first: "$students.profile.lastName" },
          },
        },
      }
    },
  ])
}


export {
  findByIdAndJoinProfiles
}

