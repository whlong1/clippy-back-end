import { Squad } from '../models/squad.js'

function index(req, res) {
  if (req.profile.role >= 400) {
    Squad.find({})
      .populate({ path: 'students', options: { sort: 'normalizedName' } })
      .then((squads) => res.json(squads))
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  } else {
    res.status(401).json({ err: 'Not Authorized' })
  }
}

function create(req, res) {
  if (req.profile.role >= 900) {
    Squad.create(req.body)
      .then((squad) => {
        res.json(squad)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  } else {
    res.status(401).json({ err: 'Not Authorized' })
  }
}

function addMember(req, res) {
  if (req.profile.role >= 900) {
    Squad.findById(req.params.squadId)
      .then((squad) => {
        if (!squad.students.includes(req.params.profileId)) {
          squad.students.push(req.params.profileId)
          squad.save()
          squad.populate({ path: 'students', options: { sort: 'normalizedName' } })
            .then((squad) => {
              res.json(squad)
            })
        }
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  } else {
    res.status(401).json({ err: 'Not Authorized' })
  }
}

function removeMember(req, res) {
  if (req.profile.role >= 900) {
    Squad.findById(req.params.squadId)
      .then((squad) => {
        squad.students.remove(req.params.profileId)
        squad.save()
        squad.populate({ path: 'students', options: { sort: 'normalizedName' } })
          .then((squad) => {
            res.json(squad)
          })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  } else {
    res.status(401).json({ err: 'Not Authorized' })
  }
}

function deleteSquad(req, res) {
  if (req.profile.role >= 900) {
    Squad.findByIdAndDelete(req.params.id)
      .then((squad) => {
        res.json(squad)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  } else {
    res.status(401).json({ err: 'Not Authorized' })
  }
}

export {
  index,
  create,
  addMember,
  removeMember,
  deleteSquad as delete
}