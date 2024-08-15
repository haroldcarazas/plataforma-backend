import { Router } from 'express'
import ProductoController from '../controllers/producto.controller.js'
import { validateId } from '../middlewares/middleware.js'

const router = Router()

router.get('/', ProductoController.index)
router.get('/:id', validateId, ProductoController.find)

export default router
