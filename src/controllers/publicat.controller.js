import pubCatModel from '../models/publicat.model.js'

export const index = async (req, res) => {
  try {
    const { id } = req.params
    const resultado = await pubCatModel.allPubCat(id)
    console.log(resultado)
    if (!resultado) {
      return res.status(404).json({ message: 'No se encotró ningun registro' })
    }

    res.json(resultado)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const createPubCat = async (req, res) => {
  try {
    const { publicacionId, categoriaId } = req.body
    if (!publicacionId || !categoriaId) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const resultado = await pubCatModel.createPublicacionCategoria({ publicacionId, categoriaId })

    if (resultado) {
      return res.json({ message: 'El registro fue creado.' })
    } else {
      return res.status(500).json({ message: 'No se puede crear el registro' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const updatePubCat = async (req, res) => {
  const { publicacionId, categoriaId } = req.params
  const { nuevaPublicacionId, nuevaCategoriaId } = req.body

  const result = await pubCatModel.updatePublicacionCategoria({ publicacionId, categoriaId, nuevaPublicacionId, nuevaCategoriaId })

  if (result) {
    res.status(200).json({ message: 'Publicación y categoría actualizadas' })
  } else {
    res.status(404).json({ message: 'Publicación y categoría no encontradas' })
  }
}

export const removePubCat = async (req, res) => {
  try {
    const { publicacionId, categoriaId } = req.body
    const { id } = req.params
    if (!id || !publicacionId || !categoriaId) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const eliminado = await pubCatModel.removePublicacionCategoria(id)

    if (eliminado) {
      return res.json({ message: 'Registro eliminado' })
    } else {
      return res.status(500).json({ message: 'No se ouede eliminar el registro' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
