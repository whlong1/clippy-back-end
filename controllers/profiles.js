import { Profile } from '../models/profile.js'
import { auth0MgmtApi } from '../helpers/auth0.js'

async function index(req, res) {
  try {
    const params = {
      search_engine: 'v3',
      per_page: 50,
      page: 0
    }
    const users = await auth0MgmtApi.getUsers(params)
    console.log(users);
    res.json(users)
  } catch (error) {
    console.log(error);
  }
}

export { index }
