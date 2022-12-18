import { Profile } from '../models/profile.js'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    console.log('INDEX PROFILES', profiles)
  } catch (error) {
    console.log(error);
  }
}

export { index }
