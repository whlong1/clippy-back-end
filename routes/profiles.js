import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get('/', profilesCtrl.index)

export { router }
