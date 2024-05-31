import rolesModel from '../models/roles.model.js'

export const index = async (req, res) => {
  try {
    const roles = await rolesModel.all()
    if (roles.length === 0) {
      return res.status(404).json({ message: 'No se encontró rol' })
    }
    res.json(roles)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const indexId = async (req, res) => {
  try {
    const { id } = req.params
    const roles = await rolesModel.allId(id)
    if (roles.length === 0) {
      return res.status(404).json({ message: 'No se encontró el rol' })
    }
    res.json(roles)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
