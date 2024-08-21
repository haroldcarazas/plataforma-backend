import Curso from '../models/Curso.js'
import Examen from '../models/Examen.js'
import Pregunta from '../models/Pregunta.js'

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
    for (const r of respuestas) {
      const pregunta = await Pregunta.findById(r.pregunta)
      if (pregunta?.respuesta === r.respuestaAlumno) {
        puntaje += pregunta.puntaje
      }

      if (pregunta.opciones.length > 0) {
        const opcionEncontrada = pregunta.opciones.find(o => o.opcion === r.respuestaAlumno)
        puntaje += opcionEncontrada.correcto ? pregunta.puntaje : 0
      }
    }

    // console.log(puntaje)
    res.json(puntaje)
  }
}

export default ExamenController
