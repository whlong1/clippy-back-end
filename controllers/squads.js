import { Squad } from '../models/squad.js'

async function index(req, res) {
  try {
    if (req.profile.role < 400) {
      return res.status(401).json({ err: 'Not Authorized' })
    }
    const squads = await Squad.find({}).populate({
      path: 'students', options: { sort: 'normalizedName' }
    })
    res.status(200).json(squads)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    if (req.profile.role < 900) {
      return res.status(401).json({ err: 'Not Authorized' })
    }
    const squad = await Squad.create(req.body)
    res.status(200).json(squad)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function addMember(req, res) {
  try {
    if (req.profile.role < 900) {
      return res.status(401).json({ err: 'Not Authorized' })
    }
    const squad = await Squad.findById(req.params.squadId)
    if (!squad.students.includes(req.params.profileId)) {
      squad.students.push(req.params.profileId)
      await squad.save()
      await squad.populate({ path: 'students', options: { sort: 'normalizedName' } })
      res.status(200).json(squad)
    }
  } catch (err) {
    res.status(500).json(err)
  }

}

async function removeMember(req, res) {
  try {
    if (req.profile.role < 900) {
      return res.status(401).json({ err: 'Not Authorized' })
    }
    const squad = await Squad.findById(req.params.squadId)
    squad.students.remove(req.params.profileId)
    await squad.save()
    await squad.populate({ path: 'students', options: { sort: 'normalizedName' } })
    res.status(200).json(squad)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteSquad(req, res) {
  try {
    if (req.profile.role < 900) {
      return res.status(401).json({ err: 'Not Authorized' })
    }
    const squad = await Squad.findByIdAndDelete(req.params.id)
    res.status(200).json(squad)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  index,
  create,
  addMember,
  removeMember,
  deleteSquad as delete
}