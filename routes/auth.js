import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'

import * as authCtrl from '../controllers/auth.js'


const router = Router()

/*---------- Public Routes ----------*/

router.get('/verify', checkJwt, authCtrl.verify)

export { router }