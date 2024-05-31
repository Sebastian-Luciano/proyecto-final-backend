import { pool } from '../config/db.js'

const all = async () => {
  const [resultado] = await pool.query('SELECT * FROM categorias')
  return resultado
}
const allId = async (id) => {
  const [resultado] = await pool.query('SELECT * FROM categorias WHERE categoria_id = ?', [id])
  return resultado
}

const allPublicacionCategoria = async () => {
  const [resultado] = await pool.query(`SELECT c.categoria_nombre, p.titulo, p.contenido, pe.persona_nombre, p.fecha_creacion
  FROM publicacion_categoria pc
  JOIN publicaciones p ON pc.publicacion_id = p.publicacion_id
  JOIN categorias c ON pc.categoria_id = c.categoria_id
  JOIN personas pe ON p.persona_id = pe.persona_id;`)
  return resultado
}

const createCategoria = async ({ categoriaNombre }) => {
  const [resultado] = await pool.execute('INSERT INTO categorias(categoria_nombre) VALUES(?)', [categoriaNombre])

  return resultado.affectedRows === 1
}

const updteCategoria = async ({ id, categoriaNombre }) => {
  const [resultado] = await pool.execute('UPDATE categorias SET categoria_nombre = ? WHERE categoria_id = ?', [categoriaNombre, id])

  return resultado.affectedRows === 1
}

const removeCategoria = async (id) => {
  const [resultado] = await pool.query('DELETE FROM categorias WHERE categoria_id = ?', [id])

  return resultado.affectedRows === 1
}
export default { all, allId, allPublicacionCategoria, createCategoria, updteCategoria, removeCategoria }
