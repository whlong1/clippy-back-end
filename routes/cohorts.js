import { Router } from 'express'
// import { checkJwt, checkAdmin } from '../middleware/auth.js'
import * as cohortsCtrl from '../controllers/cohorts.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.get('/', cohortsCtrl.index)
router.post('/', cohortsCtrl.create)
router.get('/:cohortId/people', cohortsCtrl.indexPeople)


router.post('/:cohortId/deny/:profileId', cohortsCtrl.denyProfile)
router.post('/:cohortId/remove/:profileId', cohortsCtrl.removeProfile)
router.post('/:cohortId/approve/:profileId', cohortsCtrl.approveProfile)
router.post('/:cohortId/waitlist/:profileId', cohortsCtrl.addProfileToWaitlist)

export { router }
