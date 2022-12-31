import { Profile } from '../models/profile/profile.js'
// import { getAccessToken, getRoles } from '../helpers/auth0.js'

async function getUserDataFromToken(req, res) {
  try {
    // console.log('REQ.AUTH', req.auth)
    const profile = await Profile.findOne({ user_id: req.auth.sub })
    if (profile) {
      // console.log('Profile', profile)
      // Getting user roles is redundant after front end fix.
      // Should we leave this in as an added security measure?

      // const accessToken = await getAccessToken()
      // const roles = await getRoles(accessToken, req.auth.sub)
      // profile.admin = roles.some((r) => r.name === 'Admin')
      // console.log(roles)
      

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