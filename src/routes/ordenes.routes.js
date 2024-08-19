import { Router } from 'express'
import OrdenController from '../controllers/orden.controller.js'

const router = Router()

router.get('/', OrdenController.index)

export default router
