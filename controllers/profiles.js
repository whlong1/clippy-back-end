import { Profile } from '../models/profile.js'

async function index(req, res) {
  try {
    console.log('INDEX PROFILES')
  } catch (error) {
    console.log(error);
  }
}

export { index }
