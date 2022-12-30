import mongoose from 'mongoose'

function deliverableModelMethod(deliverableId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(deliverableId) } },
  ])
}

export {

}
