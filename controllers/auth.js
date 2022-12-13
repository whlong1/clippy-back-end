import { Profile } from '../models/profile.js'
import { auth0MgmtApi } from '../helpers/auth0.js'

import axios from 'axios'




async function getAccessToken() {
  const options = {
    method: "POST",
    headers: { 'content-type': 'application/json' },
    url: "https://dev-56chijhh78c0pcex.us.auth0.com/oauth/token",
    data: {
      grant_type: "client_credentials",
      audience: "auth.ga-identity-app.com",

      // Client Side Info:
      // client_id: process.env.AUTH0_CLIENT_ID,
      // client_secret: process.env.AUTH0_CLIENT_SECRET
    
      // My App (m2m) Currently works:
      client_id: "U9BRjgCpT6cJsnoHjLiYgsU79Pkbnqrd",
      client_secret: "D4Csv5s6j-vA5CG9qeRa3ErMXsRpmtplnGwbsgUrflExgELkXJlEKHv9AF5_9pQh",
    }
  }
  const res = await axios(options)
  return res.data.access_token
}


async function getUser(sub, accessToken) {
  console.log('TOKEN:::::::',accessToken)
  try {
    const options = {
      method: 'GET',
      // params: { search_engine: 'v3' },
      // https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id
      url: `https://dev-56chijhh78c0pcex.us.auth0.com/userinfo`,
      headers: { 
        // 'content-type': 'application/json', 
        authorization: `Bearer ${accessToken}` }
    }
    const res = await axios(options)
    console.log(':::::RES:::::', res)
  } catch (err) {
    console.log('Get User Error', err.message)
  }
}



async function verifyUser(req, res) {
  try {
    const accessToken = await getAccessToken()

    // console.log('************', accessToken)
    await getUser(req.auth.sub, accessToken)


    // const profile = await Profile.findOne({ sub: req.auth.sub })
    res.json({ msg: 'Oh Lord, why' })
  } catch (error) {
    console.log(error)
  }
}

export {
  verifyUser,
}