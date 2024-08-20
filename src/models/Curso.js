import { Schema, model } from 'mongoose'

const cursoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }
})

const Curso = model('Curso', cursoSchema)

export default Curso
