import { Profile } from '../models/profile.js'

async function verify(req, res) {
  try {
    console.log('REQ.AUTH', req.auth)
    res.json(req.auth)
  } catch (error) {
    console.log(error)
  }
}

export {
  verify,
}