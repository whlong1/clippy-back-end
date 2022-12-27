import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'
import * as authCtrl from '../controllers/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.get('/tokens', checkJwt, authCtrl.getUserDataFromToken)

export { router }