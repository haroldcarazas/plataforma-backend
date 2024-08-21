import { Schema, model, Types } from 'mongoose'
import Curso from './Curso.js'
import Pregunta from './Pregunta.js'

const examenSchema = new Schema({
  curso: {
    type: Types.ObjectId,
    required: true,
    ref: Curso
  },
  calificacionMinima: {
    type: Number,
    required: true
  },
  duracion: {
    type: Number,
    required: true
  },
  preguntas: [
    {
      type: Types.ObjectId,
      required: true,
      ref: Pregunta
    }
  ]
})

const Examen = model('Examene', examenSchema)

export default Examen
