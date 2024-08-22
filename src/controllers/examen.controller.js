import Curso from '../models/Curso.js'
import Examen from '../models/Examen.js'
import Pregunta from '../models/Pregunta.js'
import Respuesta from '../models/Respuesta.js'

class ExamenController {
  static async find (req, res) {
    const { id } = req.params

    const examen = await Examen.findById(id).populate('preguntas', '-respuesta -opciones.correcto -opciones._id')
    res.json(examen)
  }

  static async getByCurso (req, res) {
    const { id } = req.params

    const curso = await Curso.findById(id)
    if (!curso) return res.status(404).json({ message: 'El curso no existe' })

    const examenes = await Examen.find({ curso: id }).select('-preguntas')
    res.json(examenes)
  }

  static async store (req, res) {
    const { examen, respuestas } = req.body

    const examenData = await Examen.findById(examen)
    if (!examenData) return res.status(404).json({ message: 'Examen inválido' })

    let puntaje = 0
    const respuestasArray = []
    for (const r of respuestas) {
      const pregunta = await Pregunta.findById(r.pregunta)
      if (pregunta?.respuesta === r.respuestaAlumno) {
        puntaje += pregunta.puntaje

        respuestasArray.push({ pregunta: pregunta._id, respuesta: r.respuestaAlumno })
      }
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

export default ExamenController
