import { Router } from 'express'
import ProductoController from '../controllers/producto.controller.js'

const router = Router()

router.get('/', ProductoController.index)

export default router
