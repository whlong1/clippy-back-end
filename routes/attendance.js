import { Router } from 'express'
import * as attendanceCtrl from '../controllers/attendance.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get('/:cohortId', attendanceCtrl.index)


export { router }