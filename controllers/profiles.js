import { Profile } from '../models/profile.js'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (error) {
    console.log(error)
  }
}

export { index }
