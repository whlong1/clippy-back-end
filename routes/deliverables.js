import { Router } from 'express'
import { checkJwt, checkAdmin } from '../middleware/auth.js'

import * as deliverablesCtrl from '../controllers/deliverables.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.get('/', deliverablesCtrl.index)
router.post('/', deliverablesCtrl.create)



export { router }
