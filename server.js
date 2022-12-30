import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import formData from 'express-form-data'

import { router as authRouter } from './routes/auth.js'
import { router as adminRouter } from './routes/admin.js'
import { router as cohortRouter } from './routes/cohorts.js'
import { router as profilesRouter } from './routes/profiles.js'
import { router as attendanceRouter } from './routes/attendance.js'
import { router as deliverablesRouter } from './routes/deliverables.js'

import './config/database.js'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(formData.parse())

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/cohort', cohortRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/deliverables', deliverablesRouter)

app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }