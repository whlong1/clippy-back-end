import { Profile } from '../models/profile/profile.js'

async function getUserDataFromToken(req, res) {
  try {
    // The 'user_id' value we need can be found on req.auth.sub:
    const profile = await Profile.findOne({ user_id: req.auth.sub })
    if (profile) {
      res.status(200).json(profile)
    } else {
      throw Error('Profile not found!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  getUserDataFromToken,
}