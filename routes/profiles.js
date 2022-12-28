import { Router } from 'express'
import { checkJwt, checkAdmin } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'


const router = Router()

/*---------- Public Routes ----------*/

router.get('/', profilesCtrl.index)

/*---------- Protected Routes ----------*/

export { router }
