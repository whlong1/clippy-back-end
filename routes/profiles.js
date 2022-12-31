import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.get('/', checkJwt, profilesCtrl.getMyProfile)
router.get('/:profileId/attendance', profilesCtrl.getAllMyAttendance)
router.get('/:profileId/deliverables', profilesCtrl.getAllMyDeliverables)


export { router }
