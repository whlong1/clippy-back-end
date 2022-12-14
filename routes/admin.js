import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'
import * as adminCtrl from '../controllers/admin.js'


const router = Router()

/*---------- Protected Routes ----------*/

// Get all auth0 users
router.get('/users', checkJwt, adminCtrl.getUsers)


export { router }