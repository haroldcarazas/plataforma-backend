import { Types } from 'mongoose'
import { ALLOWED_ORIGINS } from '../config/config.js'

export const validateId = (req, res, next) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' })
  }

  next()
}

export const validateCORS = (req, res, next) => {
  try {
    const { origin } = req.headers

    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.setHeader('Access-Control-Allow-Methos', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
      return next()
    }

    res.status(403).json({ message: 'Error de CORS' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
