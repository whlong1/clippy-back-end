import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/public', (req, res) => {
  res.send('This is a public route.')
})

/*---------- Protected Routes ----------*/

router.get('/private', checkJwt, (req, res) => {
  res.send('This is a protected route.')
})

export { router }