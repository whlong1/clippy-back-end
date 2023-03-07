import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/

router.get('/', checkJwt, profilesCtrl.index)
router.get('/me', checkJwt, profilesCtrl.getMyProfile)
router.get('/:profileId', checkJwt, profilesCtrl.show)
router.patch('/', checkJwt, profilesCtrl.updateProfile)
router.patch('/:profileId', checkJwt, profilesCtrl.updateStudentSquad)
router.get('/:profileId/attendance', checkJwt, profilesCtrl.getAllMyAttendance)
router.get('/:profileId/deliverables', checkJwt, profilesCtrl.getAllMyDeliverables)


export { router }
