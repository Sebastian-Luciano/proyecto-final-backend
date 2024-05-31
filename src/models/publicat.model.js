import { pool } from '../config/db.js'

const allPubCat = async () => {
  const [resultado] = await pool.query('SELECT * FROM publicacion_categoria')

  return resultado
}

const createPublicacionCategoria = async ({ publicacionId, categoriaId }) => {
  const [resultado] = await pool.execute('INSERT INTO publicacion_categoria(publicacion_id, categoria_id ) VALUES(?, ?)', [publicacionId, categoriaId])

  return resultado.affectedRows === 1
}

const updatePublicacionCategoria = async ({ publicacionId, categoriaId, nuevaPublicacionId, nuevaCategoriaId }) => {
  try {
    await pool.query('START TRANSACTION')
    const [resultado] = await pool.query('UPDATE publicacion_categoria SET publicacion_id = ?, categoria_id = ? WHERE publicacion_id = ? AND categoria_id = ?', [nuevaPublicacionId, nuevaCategoriaId, publicacionId, categoriaId])

    if (resultado.affectedRows === 0) {
      throw new Error('No se encontró la publicación o categoría')
    }

    await pool.query('COMMIT')
    return true
  } catch (error) {
    await pool.query('ROLLBACK')
    console.error('Error al actualizar publicacion_categoria:', error)
    return false
  }
}

const removePublicacionCategoria = async (publicacionId) => {
  const [resultado] = await pool.execute('DELETE FROM publicacion_categoria WHERE categoria_id  = ?', [publicacionId])

  return resultado
}

export default { allPubCat, createPublicacionCategoria, updatePublicacionCategoria, removePublicacionCategoria }
