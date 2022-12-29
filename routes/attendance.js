import { Router } from 'express'
import * as attendanceCtrl from '../controllers/attendance.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get('/', attendanceCtrl.index)
router.post('/', attendanceCtrl.create)

router.get('/:attendanceId', attendanceCtrl.show)

router.patch('/:attendanceId', attendanceCtrl.update)
router.delete('/:attendanceId', attendanceCtrl.deleteAttendance)

router.get('/:cohortId/:profileId', attendanceCtrl.getStudentAttendance)

export { router }