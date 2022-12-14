import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'
import * as adminCtrl from '../controllers/admin.js'

const router = Router()

/*---------- Protected Routes ----------*/

router.get('/users', checkJwt, adminCtrl.getUsers)
router.get('/users/:userId', checkJwt, adminCtrl.getUser)
router.patch('/users/:userId', checkJwt, adminCtrl.updateUser)
router.delete('/users/:userId', checkJwt, adminCtrl.deleteUser)


export { router }