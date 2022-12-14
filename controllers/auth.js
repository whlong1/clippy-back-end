import { Profile } from '../models/profile.js'
import axios from 'axios'


// Auth0 Management API Info
async function getAccessToken() {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    data: {
      grant_type: "client_credentials",
      client_id: process.env.CLIENT_ID,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      client_secret: process.env.CLIENT_SECRET,
    }
  }
  const response = await axios(options)
  return response.data.access_token
}

async function getUsers(req, res) {
  try {
    const accessToken = await getAccessToken()
    const options = {
      method: 'GET',
      params: { search_engine: 'v3' },
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
      headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` }
    }
    const response = await axios(options)
    console.log(':::: User List ::::', response.data)
    res.json({ msg: 'OK' })
  } catch (error) {
    console.log(error.message)
  }
}

export {
  getUsers,
}