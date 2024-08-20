import Usuario from '../models/Usuario.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

class AuthController {
  static async register (req, res) {
    const { nombres, apellidos, username, email, password, rol, curso } = req.body
    if (!nombres || !apellidos || !username || !email || !password || !rol || !curso) return res.status(400).json({ message: 'Faltan datos' })

    const passwordHashed = await bcrypt.hash(password, 10)

    const usuario = await Usuario.create({
      nombres,
      apellidos,
      username,
      email,
      password: passwordHashed,
      rol,
      curso
    })

    res.status(201).json({ message: 'Usuario creado', data: usuario })
  }

  static async login (req, res) {
    const { username, password } = req.body

    const usuario = await Usuario.findOne({ username })
    if (!usuario) return res.status(404).json({ message: 'El usuario no existe' })

    const isValid = await bcrypt.compare(password, usuario.password)
    if (!isValid) return res.status(400).json({ message: 'Credenciales inválidas' })

    const token = jwt.sign({ id: usuario._id }, SECRET_KEY, { expiresIn: '1h' })

    res.json({ message: 'Login exitoso', token })
  }

  static async me () {

  }
}

export default AuthController
