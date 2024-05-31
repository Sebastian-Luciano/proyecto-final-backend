import path from 'node:path'
import fs from 'node:fs/promises'
import personasModel from '../models/usuarios.model.js'
import { nuevoNombreFotoPerfil } from '../config/multer.js'

export const indexPersonas = async (req, res) => {
  try {
    const { id } = req.params
    const usuarios = await personasModel.allPersona(id)
    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontró el registro' })
    }
    res.json(usuarios)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const removePersonas = async (req, res) => {
  try {
    const { id } = req.params
    const [foto] = await personasModel.fotoPersona(id)
    if (!foto) return res.status(404).json({ message: 'Foto no encontrado' })

    const rutaImagen = path.resolve('./src/uploads/foto_perfil', foto.foto_perfil)
    await fs.unlink(rutaImagen)

    const eliminado = await personasModel.removePersona(id)

    if (eliminado) {
      return res.json({ message: 'Persona eliminado' })
    } else {
      return res.status(500).json({ message: 'No se pudo eliminar el persona' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const storePersonas = async (req, res) => {
  try {
    const { nombrePersona, email, password, rolId } = req.body

    if (!nombrePersona || !email || !password || !rolId) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const fotoPerfil = nuevoNombreFotoPerfil
    if (fotoPerfil === null) {
      return res.status(400).json({ message: 'No se proporcionó una foto de perfil' })
    }

    const resultado = await personasModel.createPersona({ nombrePersona, email, password, rolId, fotoPerfil })

    if (resultado) {
      return res.status(201).json({ message: 'Persona creado' })
    } else {
      return res.status(500).json({ message: 'No se puede crear la Persona' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const updatePersonas = async (req, res) => {
  try {
    const { nombrePersona, email, password, rolId } = req.body
    const { id } = req.params

    if (!id || !nombrePersona || !email || !password || !rolId) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const fotoPerfil = nuevoNombreFotoPerfil
    if (fotoPerfil === null) {
      return res.status(400).json({ message: 'No se proporcionó una foto de perfil' })
    }

    const resultado = await personasModel.updatePersona({ id, nombrePersona, email, password, rolId, fotoPerfil })

    if (resultado) {
      return res.json({ message: 'Persona actualizada' })
    } else {
      return res.status(500).json({ message: 'No se pudo actualizar a la Persona' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
