import path from 'path'
import fs from 'fs/promises'
import publicacionesModel from '../models/publicaciones.model.js'
import { nuevoNombreImagenPublicacion } from '../config/multer.js'

export const index = async (req, res) => {
  try {
    const publicacion = await publicacionesModel.all()
    if (publicacion.length === 0) return res.status(404).json({ message: 'No se encontró ningun registro' })

    res.json(publicacion)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const getImagenesPublicacion = async (req, res) => {
  try {
    const { id } = req.params

    const [publicacion] = await publicacionesModel.buscaPublicacion(id)
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' })

    const imagenes = await publicacionesModel.imagenPublicacion(id)

    if (imagenes.length === 0) return res.status(404).json({ message: 'No hay imágenes asociadas a esta publicación' })

    res.json(imagenes)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const indexPublicacion = async (req, res) => {
  try {
    const { id } = req.params
    const publicacion = await publicacionesModel.allPublicacion(id)
    if (publicacion.length === 0) {
      return res.status(404).json({ message: 'No se encontró el registro' })
    }
    res.json(publicacion)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const publicacionCategoria = async (req, res) => {
  try {
    const { categoria } = req.params
    const filtrarCategoria = await publicacionesModel.publicacionCategoria(categoria)
    if (filtrarCategoria.length === 0) {
      return res.status(404).json({ message: 'No se encontró el registro' })
    }
    res.json(filtrarCategoria)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const publicacionTitulo = async (req, res) => {
  try {
    const { titulo } = req.params
    const filtrarTitulo = await publicacionesModel.publicacionTitulo(titulo)
    if (filtrarTitulo.length === 0) {
      return res.status(404).json({ message: 'No se encontró el registro' })
    }
    res.json(filtrarTitulo)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const createPublicaciones = async (req, res) => {
  try {
    const { titulo, contenido, personaId, fechaCreacion } = req.body

    if (!titulo || !contenido || !personaId || !fechaCreacion) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const resultado = await publicacionesModel.createPublicacion({ titulo, contenido, personaId, fechaCreacion })

    if (resultado) {
      return res.status(201).json({ message: 'Publicación creada' })
    } else {
      return res.status(500).json({ message: 'No se puede crear la publicacion' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const createImgenesPublicacion = async (req, res) => {
  try {
    const { publicacionId } = req.body

    if (!publicacionId) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const imagenPublicacion = nuevoNombreImagenPublicacion
    if (imagenPublicacion === null) return res.status(400).json({ message: 'No se proporcionó imagen de publicación' })

    const resultado = await publicacionesModel.createImgenPublicacion({ publicacionId, imagenPublicacion })

    if (resultado) {
      return res.status(201).json({ message: 'Imagen de publicación creada' })
    } else {
      return res.status(500).json({ message: 'No se puede crear la imagen de publicación' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const updatePublicaciones = async (req, res) => {
  try {
    const { titulo, contenido, personaId, fechaCreacion } = req.body
    const { id } = req.params

    if (!titulo || !contenido || !personaId || !fechaCreacion) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const resultado = await publicacionesModel.updatePublicacion({ id, titulo, contenido, personaId, fechaCreacion })

    if (resultado) {
      return res.json({ message: 'Publicación actualizada' })
    } else {
      return res.status(500).json({ message: 'No se pudo actualizar la publicación' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const updateImgenesPublicacion = async (req, res) => {
  try {
    const { id } = req.params
    const publicacion = await publicacionesModel.buscaPublicacion(id)
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' })

    const { publicacionId } = req.body
    const { imagenId } = req.params
    if (!imagenId || !publicacionId) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const imagenPublicacion = nuevoNombreImagenPublicacion
    if (imagenPublicacion === null) {
      return res.status(400).json({ message: 'No se proporcionó una imagen publicada' })
    }

    const resultado = await publicacionesModel.updateImgenPublicacion({ imagenId, publicacionId, imagenPublicacion })

    if (resultado) {
      return res.json({ message: 'Imagen Publicada Actualizada' })
    } else {
      return res.status(500).json({ message: 'No se pudo actualizar la publicación' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const removePublicaciones = async (req, res) => {
  const { id } = req.params

  try {
    const imagenes = await publicacionesModel.imagenPublicacion(id)

    if (!imagenes || imagenes.length === 0) return res.status(404).json({ message: 'Imgen publicada no encontrada' })

    for (const imagen of imagenes) {
      const rutaImagen = path.resolve('./src/uploads/img_publicacion', imagen.imagen_publicacion)
      await fs.unlink(rutaImagen)
    }

    const eliminado = await publicacionesModel.removePublicacion(id)

    if (eliminado) {
      return res.json({ message: 'Publicación eliminada' })
    } else {
      return res.status(500).json({ message: 'No se pudo eliminar la publicación' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error al eliminar la publicación' })
  }
}

export const removeImgenPublicacion = async (req, res) => {
  try {
    const { id } = req.params
    const [publicacion] = await publicacionesModel.buscaPublicacion(id)
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' })

    const { imgId } = req.params
    const [imagen] = await publicacionesModel.buscaImagenPublicacion(imgId)
    if (!imagen) return res.status(404).json({ message: 'Imagen de publicación no encontrada' })

    const rutaImagen = path.resolve('./src/uploads/img_publicacion', imagen.imagen_publicacion)
    await fs.unlink(rutaImagen)

    const eliminado = await publicacionesModel.removeImgenPublicacion(imgId)

    if (eliminado) {
      return res.json({ message: 'Imagen publicada eliminado' })
    } else {
      return res.status(500).json({ message: 'No se pudo eliminar la imagen publicada' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
