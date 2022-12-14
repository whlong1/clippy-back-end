import { Router } from 'express'
import * as authCtrl from '../controllers/auth.js'
import { checkJwt } from '../middleware/auth.js'


const router = Router()

/*---------- Protected Routes ----------*/

router.get('/verify', checkJwt, authCtrl.getUsers)


export { router }