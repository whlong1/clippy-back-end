import { Router } from 'express'
import { checkAdmin, checkJwt } from '../middleware/auth.js'
import * as deliverablesCtrl from '../controllers/deliverables.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.get('/', checkJwt, deliverablesCtrl.index)
router.post('/', checkJwt, checkAdmin, deliverablesCtrl.create)
router.get('/:deliverableId', checkJwt, deliverablesCtrl.show)
router.delete('/:deliverableId', checkJwt, checkAdmin, deliverablesCtrl.deleteDeliverable)

router.get('/:sdId/view', checkJwt, deliverablesCtrl.showStudentDeliverable)
router.patch('/:sdId/submit', checkJwt, deliverablesCtrl.submitStudentDeliverable)
router.patch('/:sdId/grade', checkJwt, checkAdmin, deliverablesCtrl.gradeStudentDeliverable)

export { router }
