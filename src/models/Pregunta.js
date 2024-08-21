import { Schema, model } from 'mongoose'

const preguntaSchema = new Schema({
  pregunta: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  puntaje: {
    type: Number,
    required: true
  },
  respuesta: {
    type: String,
    required: false
  },
  opciones: [
    {
      opcion: {
        type: String,
        required: true
      },
      correcto: {
        type: Boolean,
        required: true
      }
    }
  ]
})

const Pregunta = model('Pregunta', preguntaSchema)

export default Pregunta
