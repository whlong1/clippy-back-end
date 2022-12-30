import mongoose from 'mongoose'

function findByIdAndJoinStudentName(sdId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(sdId) } },
  ])
}


export {
  findByIdAndJoinStudentName,
}


