import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/verify', checkJwt, (req, res) => {
  console.log('REQ.AUTH', req.auth)
  res.json(req.auth)
})

export { router }