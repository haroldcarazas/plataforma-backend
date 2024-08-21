import { Schema, model } from 'mongoose'
import Usuario from './Usuario.js'

const videoSchema = new Schema({
  archivo: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: Usuario,
    required: true
  }
})

const Video = model('Video', videoSchema)

export default Video
