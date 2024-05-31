import { pool } from '../config/db.js'

const buscaPublicacion = async (id) => {
  const [resultado] = await pool.query('SELECT titulo FROM publicaciones WHERE publicacion_id = ?', [id])

  return resultado
}

const allIdPublicacion = async (id) => {
  const [resultado] = await pool.query(`SELECT c.comentario_id, c.contenido, p.persona_nombre,   pu.titulo,  c.fecha_creacion
  FROM comentarios c
  JOIN personas p ON c.persona_id = p.persona_id
  JOIN publicaciones pu ON c.publicacion_id = pu.publicacion_id WHERE pu.publicacion_id = ?;`, [id])

  return resultado
}

const createComentario = async ({ contenido, personaId, publicacionId, fechaCreacion }) => {
  const [resultado] = await pool.execute('INSERT INTO comentarios(contenido, persona_id, publicacion_id, fecha_creacion) VALUES(?, ?, ?, ?)', [contenido, personaId, publicacionId, fechaCreacion])

  return resultado.affectedRows === 1
}

const updateComentario = async ({ idComent, contenido, personaId, publicacionId, fechaCreacion }) => {
  const [resultado] = await pool.execute('UPDATE comentarios SET contenido = ?, persona_id = ?, publicacion_id = ?, fecha_creacion = ? WHERE comentario_id = ?', [contenido, personaId, publicacionId, fechaCreacion, idComent])

  return resultado.affectedRows === 1
}

const removeComentario = async (idComent) => {
  const [resultado] = await pool.execute('DELETE FROM comentarios WHERE comentario_id = ?', [idComent])

  return resultado
}

export default { buscaPublicacion, allIdPublicacion, createComentario, updateComentario, removeComentario }
