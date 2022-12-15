import { Profile } from '../models/profile.js'
import { getAccessToken, getRoles } from '../helpers/auth0.js'

async function getUserDataFromToken(req, res) {
  try {
    const accessToken = await getAccessToken()
    const roles = await getRoles(accessToken, req.auth.sub)
    req.auth.admin = roles.some((r) => r.name === 'Admin')
    res.json(req.auth)
  } catch (error) {
    console.log(error.message)
  }
}

export {
  getUserDataFromToken,
}