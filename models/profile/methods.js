import mongoose from 'mongoose'

function findByIdAndJoinDeliverables(profileId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(profileId) } },
  ])
}


export {
  findByIdAndJoinDeliverables
}


