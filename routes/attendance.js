import { Router } from 'express'
import { checkAdmin, checkJwt } from '../middleware/auth.js'
import * as attendanceCtrl from '../controllers/attendance.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.get('/', attendanceCtrl.index)
router.post('/', attendanceCtrl.create)

router.get('/:attendanceId', attendanceCtrl.show)
router.put('/:attendanceId', attendanceCtrl.update)
router.delete('/:attendanceId', attendanceCtrl.deleteAttendance)

export { router }