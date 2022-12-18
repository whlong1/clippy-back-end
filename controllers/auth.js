import { Profile } from '../models/profile.js'
import { getAccessToken, getRoles } from '../helpers/auth0.js'

async function getUserDataFromToken(req, res) {
  try {
    const profile = await Profile.findOne({ user_id: req.auth.sub })
    if (profile) {
      const accessToken = await getAccessToken()
      const roles = await getRoles(accessToken, req.auth.sub)
      profile.admin = roles.some((r) => r.name === 'Admin')
      res.json(profile)
    } else {
      throw Error('Profile not found!')
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export {
  getUserDataFromToken,
}