import { Router } from 'express'
import * as squadsCtrl from '../controllers/squads.js'

const router = Router()

/*---------- Protected Routes ----------*/

router.get('/', squadsCtrl.index)
router.post('/', squadsCtrl.create)
router.delete('/:id', squadsCtrl.delete)
router.put('/:squadId/students/:profileId', squadsCtrl.addMember)
router.delete('/:squadId/students/:profileId', squadsCtrl.removeMember)

export { router }