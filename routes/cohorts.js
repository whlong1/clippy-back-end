import { Router } from 'express'
import { checkAdmin, checkJwt } from '../middleware/auth.js'

import * as cohortsCtrl from '../controllers/cohorts.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/

router.get('/', checkJwt, cohortsCtrl.index)

router.post('/', checkJwt, checkAdmin, cohortsCtrl.create)
router.patch('/:cohortId', checkJwt, checkAdmin, cohortsCtrl.update)

router.get('/:cohortId/people', checkJwt, cohortsCtrl.getCohortPeople)
router.patch('/:cohortId/people/:profileId', checkJwt, checkAdmin, cohortsCtrl.changeRole)

// Note: addProfileToWaitlist does not need admin check as the request is made by student.
router.post('/:cohortId/waitlist/:profileId', checkJwt, cohortsCtrl.addProfileToWaitlist)
router.post('/:cohortId/deny/:profileId', checkJwt, checkAdmin, cohortsCtrl.denyProfile)
router.post('/:cohortId/remove/:profileId', checkJwt, checkAdmin, cohortsCtrl.removeProfile)
router.post('/:cohortId/approve/:profileId', checkJwt, checkAdmin, cohortsCtrl.approveProfile)

export { router }