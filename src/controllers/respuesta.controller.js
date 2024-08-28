import Examen from '../models/Examen.js'
import Pregunta from '../models/Pregunta.js'
import Respuesta from '../models/Respuesta.js'
import Video from '../models/Video.js'

class RespuestaController {
  static async store (req, res) {
    const { examen, respuestas } = req.body
    const { filename } = req.file
    const respuestasIterable = JSON.parse(respuestas)

    const examenData = await Examen.findById(examen)
    if (!examenData) { return res.status(404).json({ message: 'Examen inválido' }) }

    const nuevoVideo = await Video.create({
      archivo: filename,
      usuario: req.user._id
    })

    let puntaje = 0
    const respuestasArray = []
    for (const r of respuestasIterable) {
      const pregunta = await Pregunta.findById(r.pregunta)
      if (pregunta?.respuesta === r.respuestaAlumno) {
        puntaje += pregunta.puntaje
      }
      respuestasArray.push({
        pregunta: pregunta._id,
        respuesta:
          pregunta.tipo === 'video' ? nuevoVideo._id : r.respuestaAlumno
      })
    }

    const nuevaRespuesta = await Respuesta.create({
      alumno: req.user._id,
      examen,
      respuestas: respuestasArray,
      puntajeObtenido: puntaje
    })

    res.json({ message: 'Respuesta guardada', data: nuevaRespuesta })
  }
}

export default RespuestaController
