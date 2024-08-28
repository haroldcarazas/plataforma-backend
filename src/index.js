import express from 'express'
import { connectDB } from './config/db.js'
import { PORT } from './config/config.js'
import authRoutes from './routes/auth.routes.js'
import examenesRoutes from './routes/examenes.routes.js'
import respuestasRoutes from './routes/respuestas.routes.js'
import { validateCORS } from './middlewares/middleware.js'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(validateCORS)

app.use('/api/auth', authRoutes)
app.use('/api/examenes', examenesRoutes)
app.use('/api/respuestas', respuestasRoutes)

connectDB()
  .then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
  .catch(error => console.log(error))
