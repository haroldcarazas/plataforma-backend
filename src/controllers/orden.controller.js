import Orden from '../models/Orden.js'

class OrdenController {
  static async index (req, res) {
    const ordenes = await Orden.find().populate('usuario productos', '-password')
    res.json(ordenes)
  }
}

export default OrdenController
