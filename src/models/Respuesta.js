import { Schema, model, Types } from 'mongoose'
import Usuario from './Usuario.js'
import Examen from './Examen.js'
import Pregunta from './Pregunta.js'

const respuestaSchema = new Schema({
  alumno: {
    type: Types.ObjectId,
    ref: Usuario,
    required: true
  },
  examen: {
    type: Types.ObjectId,
    ref: Examen,
    required: true
  },
  respuestas: [
    {
      pregunta: {
        type: Types.ObjectId,
        ref: Pregunta,
        required: true
      },
      respuesta: {
        type: Schema.Types.Mixed,
        required: true
      }
    }
  ],
  puntajeObtenido: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const Respuesta = model('Respuesta', respuestaSchema)

export default Respuesta
