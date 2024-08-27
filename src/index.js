import express from 'express'
import { connectDB } from './config/db.js'
import { PORT } from './config/config.js'
import authRoutes from './routes/auth.routes.js'
import examenesRoutes from './routes/examenes.routes.js'
import respuestasRoutes from './routes/respuestas.routes.js'
import { validateCORS } from './middlewares/middleware.js'
import morgan from 'morgan'
// import productosRoutes from './routes/productos.routes.js'
// import ordenesRoutes from './routes/ordenes.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(validateCORS)

app.use('/api/auth', authRoutes)
app.use('/api/examenes', examenesRoutes)
app.use('/api/respuestas', respuestasRoutes)
// app.use('/api/productos', productosRoutes)
// app.use('/api/ordenes', ordenesRoutes)

connectDB()
  .then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
  .catch(error => console.log(error))
