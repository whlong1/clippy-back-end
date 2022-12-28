import { Router } from 'express'
// import { checkJwt, checkAdmin } from '../middleware/auth.js'
import * as cohortCtrl from '../controllers/cohort.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.get('/', cohortCtrl.index)
router.post('/', cohortCtrl.create)
router.get('/:cohortId/people', cohortCtrl.indexPeople)


router.post('/:cohortId/approve/:profileId', cohortCtrl.approveProfile)
router.post('/:cohortId/waitlist/:profileId', cohortCtrl.addProfileToWaitlist)

export { router }