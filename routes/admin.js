import { Router } from 'express'
import * as adminCtrl from '../controllers/admin.js'
import { checkAdmin, checkJwt } from '../middleware/auth.js'

const router = Router()

/*---------- Protected Routes ----------*/

router.get('/users', checkJwt, adminCtrl.getUsers)
router.get('/users/:userId', checkJwt, adminCtrl.getUser)
router.patch('/users/:userId', checkJwt, adminCtrl.updateUser)
router.delete('/users/:userId', checkJwt, adminCtrl.deleteUser)
router.post('/cohorts/first-time-signup', checkJwt, checkAdmin, adminCtrl.createCohortAndOnboardAdmin)

// createCohortAndOnboardAdmin


export { router }