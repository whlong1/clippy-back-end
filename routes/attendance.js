import { Router } from 'express'
import * as attendanceCtrl from '../controllers/attendance.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get('/:cohortId', attendanceCtrl.index)
router.post('/:cohortId', attendanceCtrl.create)

router.patch('/:attendanceId', attendanceCtrl.update)
router.delete('/:attendanceId', attendanceCtrl.deleteAttendance)

router.get('/:cohortId/:profileId', attendanceCtrl.getStudentAttendance)

export { router }