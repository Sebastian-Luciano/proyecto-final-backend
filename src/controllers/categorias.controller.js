import categoriasModel from '../models/categorias.model.js'

export const index = async (req, res) => {
  try {
    const categorias = await categoriasModel.all()
    if (categorias.length === 0) return res.status(404).json({ message: 'No se encontró ningun registro' })
    res.json(categorias)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const indexPublicacionCategoria = async (req, res) => {
  try {
    const categorias = await categoriasModel.all()
    if (categorias.length === 0) return res.status(404).json({ message: 'No se encontró ningun registro' })
    res.json(categorias)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const createCategorias = async (req, res) => {
  try {
    const { categoriaNombre } = req.body
    if (!categoriaNombre) return res.status(400).json({ message: 'Faltan datos en el formulario' })
    const resultado = await categoriasModel.createCategoria({ categoriaNombre })

    if (resultado) {
      return res.status(201).json({ message: 'Categoria creada' })
    } else {
      return res.status(500).json({ message: 'No se puede crear la categoria' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const updateCategorias = async (req, res) => {
  try {
    const { categoriaNombre } = req.body
    const { id } = req.params

    if (!id || !categoriaNombre) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const resultado = await categoriasModel.updteCategoria({ id, categoriaNombre })

    if (resultado) {
      return res.json({ message: 'Categoria actualizada' })
    } else {
      return res.status(500).json({ message: 'No se pudo actualizar la categoria' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const removeCategorias = async (req, res) => {
  try {
    const { id } = req.params
    const [categoria] = await categoriasModel.allId(id)
    if (!categoria) return res.status(404).json({ message: 'No se encontró el registro de categoría' })

    const eliminado = categoriasModel.removeCategoria(id)

    if (eliminado) {
      return res.json({ message: 'Categoria eliminada' })
    } else {
      return res.status(500).json({ message: 'No se pudo eliminar la categoria' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
