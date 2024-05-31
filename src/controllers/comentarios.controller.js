import comentariosModel from '../models/comentarios.model.js'

export const indexId = async (req, res) => {
  try {
    const { id } = req.params

    const [publicacion] = await comentariosModel.buscaPublicacion(id)
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' })
    const [comentario] = await comentariosModel.allIdPublicacion(id)
    if (!comentario) return res.status(404).json({ message: 'No se encontró comentario' })

    res.json(comentario)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const createComentarios = async (req, res) => {
  try {
    const { id } = req.params
    const [publicacion] = await comentariosModel.buscaPublicacion(id)
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' })
    const { contenido, personaId, publicacionId, fechaCreacion } = req.body
    if (!contenido || !personaId || !publicacionId || !fechaCreacion) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const resultado = await comentariosModel.createComentario({ contenido, personaId, publicacionId, fechaCreacion })

    if (resultado) {
      return res.status(201).json({ message: 'Comentario creado' })
    } else {
      return res.status(500).json({ message: 'No se puede crear el comentario' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const updateComentarios = async (req, res) => {
  try {
    const { id } = req.params
    const [publicacion] = await comentariosModel.buscaPublicacion(id)
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' })

    const { contenido, personaId, publicacionId, fechaCreacion } = req.body
    const { idComent } = req.params
    if (!idComent || !contenido || !personaId || !publicacionId || !fechaCreacion) return res.status(400).json({ message: 'Faltan datos en el formulario' })
    const resultado = await comentariosModel.updateComentario({ idComent, contenido, personaId, publicacionId, fechaCreacion })

    if (resultado) {
      return res.json({ message: 'Comentario actualizado' })
    } else {
      return res.status(500).json({ message: 'No se pudo actualizar el comentario' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const removeComentarios = async (req, res) => {
  try {
    const { id } = req.params
    const [publicacion] = await comentariosModel.buscaPublicacion(id)
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' })

    const { contenido, personaId, publicacionId, fechaCreacion } = req.body
    const { idComent } = req.params
    if (!idComent || !contenido || !personaId || !publicacionId || !fechaCreacion) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const eliminado = await comentariosModel.removeComentario(idComent)
    if (eliminado) {
      return res.json({ message: 'Comentario eliminado' })
    } else {
      return res.status(500).json({ message: 'No se pudo eliminar el comentario' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
