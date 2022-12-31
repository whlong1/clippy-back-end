import { Router } from 'express'
import { checkAdmin, checkJwt } from '../middleware/auth.js'
import * as authCtrl from '../controllers/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.get('/', checkJwt, authCtrl.getUserDataFromToken)

export { router }