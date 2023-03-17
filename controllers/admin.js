import { Cohort } from '../models/cohort/cohort.js'
import { Profile } from '../models/profile/profile.js'

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
    res.json(response.data)
  } catch (error) {
    console.log(error.message)
  }
}

async function updateUser(req, res) {
  try {
    const accessToken = await getAccessToken()
    const options = {
      data: req.body,
      method: 'PATCH',
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${req.params.userId}`,
      headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` }
    }
    const response = await axios(options)
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

async function createCohortAndOnboardAdmin(req, res) {
  // Add admin check
  try {
    const cohort = await Cohort.create(req.body)
    const profile = await Profile.findById(req.body.profileId)

    const promiseArray = await Promise.all([
      Cohort.updateOne(
        { _id: cohort._id },
        { $addToSet: { "instructors": profile._id } }
      ),

      Profile.findByIdAndUpdate(
        profile._id,
        { isOnboarded: true, isApprovalPending: false, cohort: cohort._id },
        { new: true }
      ),
    ])

    res.status(200).json(promiseArray[1])
  } catch (err) {
    console.log(err)
  }
}

export {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createCohortAndOnboardAdmin,
}