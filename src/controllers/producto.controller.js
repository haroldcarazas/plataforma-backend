import Producto from '../models/Producto.js'

class ProductoController {
  static async index (req, res) {
    const productos = await Producto.find()
    res.json(productos)
  }
}

export default ProductoController
