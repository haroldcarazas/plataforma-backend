import { Router } from 'express'
import RespuestaController from '../controllers/respuesta.controller.js'
import { validateAlumno, validateJWT } from '../middlewares/auth.middleware.js'
import { videosUpload } from '../config/multer.js'

const router = Router()

router.post('/', validateJWT, validateAlumno, videosUpload.single('video'), RespuestaController.store)

export default router
