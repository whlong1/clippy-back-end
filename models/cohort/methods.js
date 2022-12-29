import mongoose from 'mongoose'

function findCohortAndPeople(cohortId) {
  const selectedFields = { _id: 1, name: 1, email: 1 }
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(cohortId) } },
    {
      $lookup: {
        from: 'profiles',
        localField: 'instructors',
        foreignField: '_id',
        as: 'instructors'
      }
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'ias',
        foreignField: '_id',
        as: 'ias'
      }
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'tas',
        foreignField: '_id',
        as: 'tas'
      }
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'students',
        foreignField: '_id',
        as: 'students'
      }
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'waitlist',
        foreignField: '_id',
        as: 'waitlist'
      }
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'inactive',
        foreignField: '_id',
        as: 'inactive'
      }
    },
    {
      $project: {
        _id: 1,
        ias: selectedFields,
        tas: selectedFields,
        students: selectedFields,
        waitlist: selectedFields,
        inactive: selectedFields,
        instructors: selectedFields,
      }
    },
  ])
}

export {
  findCohortAndPeople
}

