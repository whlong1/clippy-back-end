import axios from 'axios'
import { getAccessToken } from '../helpers/auth0.js'

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
    res.json(response.data)
  } catch (error) {
    console.log(error.message)
  }
}

async function getUser(req, res) {
  try {
    const accessToken = await getAccessToken()
    const options = {
      method: 'GET',
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${req.params.userId}`,
      headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` }
    }
    const response = await axios(options)
    // console.log(response.data.user_metadata)
    res.json(response.data)
  } catch (error) {
    console.log(error.message)
  }
}

async function deleteUser(req, res) {
  try {
    const accessToken = await getAccessToken()
    const options = {
      method: 'DELETE',
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${req.params.userId}`,
      headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` }
    }
    await axios(options)
    res.json({ msg: 'OK' })
  } catch (error) {
    console.log(error.message)
  }
}

export {
  getUsers,
  getUser,
  deleteUser,
}