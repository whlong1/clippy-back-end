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
    console.log('req.user', req.user)

    const profile = await Profile.find({ email: req.user.email })
    console.log('profile', profile)

    return res.status(200).json(profile)

    // safe to find profile by email
    // respond with profile

    await Promise.all([
      Cohort.updateOne(
        { _id: cohort._id },
        { $addToSet: { "instructors": profileId } }
      ),
      Profile.updateOne(
        { _id: profileId },
        { isOnboarded: true, isApprovalPending: false, cohort: cohortId }
      ),
    ])
    res.status(200).json(cohort)
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