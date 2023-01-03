import { Router } from 'express'
import { checkAdmin, checkJwt } from '../middleware/auth.js'

import * as cohortsCtrl from '../controllers/cohorts.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/

// Core
router.get('/', checkJwt, cohortsCtrl.index)

router.post('/', cohortsCtrl.create)
router.patch('/:cohortId', cohortsCtrl.update)

// People
router.get('/:cohortId/people', checkJwt, cohortsCtrl.getCohortPeople)
router.patch('/:cohortId/people/:profileId', cohortsCtrl.changeRole)

// Profile management
router.post('/:cohortId/deny/:profileId', cohortsCtrl.denyProfile)
router.post('/:cohortId/remove/:profileId', cohortsCtrl.removeProfile)
router.post('/:cohortId/approve/:profileId', checkJwt, cohortsCtrl.approveProfile)
router.post('/:cohortId/waitlist/:profileId', checkJwt, cohortsCtrl.addProfileToWaitlist)

// Add checkAdmin to:
// approveProfile, removeProfile, denyProfile, changeRole


export { router }