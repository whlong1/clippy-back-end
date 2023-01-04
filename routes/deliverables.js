import { Router } from 'express'
import { checkAdmin, checkJwt } from '../middleware/auth.js'

import * as deliverablesCtrl from '../controllers/deliverables.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.get('/', deliverablesCtrl.index)
router.post('/', checkJwt, checkAdmin, deliverablesCtrl.create)
router.get('/:deliverableId', deliverablesCtrl.show)
router.delete('/:deliverableId', deliverablesCtrl.deleteDeliverable)

router.get('/:sdId/view', deliverablesCtrl.showStudentDeliverable)
router.patch('/:sdId/grade', deliverablesCtrl.gradeStudentDeliverable)
router.patch('/:sdId/submit', deliverablesCtrl.submitStudentDeliverable)


export { router }
