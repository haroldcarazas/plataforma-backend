import Curso from '../models/Curso.js'
import Examen from '../models/Examen.js'

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
}

export default ExamenController
