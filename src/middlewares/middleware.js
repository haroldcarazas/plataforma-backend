import { Types } from 'mongoose'

export const validateId = (req, res, next) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' })
  }

  next()
}
