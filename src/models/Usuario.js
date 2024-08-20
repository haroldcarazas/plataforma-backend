import { Schema, Types, model } from 'mongoose'
import Curso from './Curso.js'

const usuarioSchema = new Schema({
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  },
  curso: {
    type: Types.ObjectId,
    required: true,
    ref: Curso
  }
})

const Usuario = model('Usuario', usuarioSchema)

export default Usuario
