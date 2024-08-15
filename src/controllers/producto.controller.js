import Producto from '../models/Producto.js'

class ProductoController {
  static async index (req, res) {
    const productos = await Producto.find()
    res.json(productos)
  }

  static async find (req, res) {
    try {
      const { id } = req.params
      const producto = await Producto.findById(id)
      res.json(producto)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default ProductoController
