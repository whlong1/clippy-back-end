import { Router } from 'express'
import { checkAdmin, checkJwt } from '../middleware/auth.js'
import * as authCtrl from '../controllers/auth.js'

const router = Router()

/*---------- Protected Routes ----------*/

router.get('/', checkJwt, checkAdmin, authCtrl.getUserDataFromToken)

export { router }