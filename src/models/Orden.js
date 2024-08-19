import { Schema, model, Types } from 'mongoose'
import Producto from './Producto.js'
import Usuario from './Usuario.js'

const ordenSchema = new Schema({
  fecha: {
    type: Date,
    required: true
  },
  productos: [
    {
      type: Types.ObjectId,
      required: true,
      ref: Producto
    }
  ],
  usuario: {
    type: Types.ObjectId,
    required: true,
    ref: Usuario
  }
})

const Orden = model('Ordene', ordenSchema)

export default Orden
