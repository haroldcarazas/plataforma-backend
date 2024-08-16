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

  static async store (req, res) {
    const { nombre, categoria, precio, stock, vendedor, descuento, descontinuado } = req.body

    if (!nombre || !categoria || !precio || !stock || !vendedor) return res.status(400).json({ message: 'Faltan datos' })

    const nuevoProducto = await Producto.create({
      nombre,
      categoria,
      precio,
      stock,
      vendedor,
      descuento: descuento || false,
      descontinuado: descontinuado || false
    })

    res.status(201).json({ message: 'Producto creado', data: nuevoProducto })
  }

  static async updatePut (req, res) {
    const { id } = req.params
    const { nombre, categoria, precio, stock, vendedor, descuento, descontinuado } = req.body

    if (!nombre || !categoria || !precio || !stock || !vendedor) return res.status(400).json({ message: 'Faltan datos' })

    const producto = await Producto.findById(id)

    producto.nombre = nombre
    producto.categoria = categoria
    producto.precio = precio
    producto.stock = stock
    producto.vendedor = vendedor
    producto.descuento = descuento || false
    producto.descontinuado = descontinuado || false

    await producto.save()

    res.status(201).json({ message: 'Producto actualizado', data: producto })
  }

  static async updatePatch (req, res) {
    try {
      const { id } = req.params
      const producto = await Producto.findById(id)
      res.json(producto)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete (req, res) {
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
