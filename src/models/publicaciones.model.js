import { pool } from '../config/db.js'

const buscaImagenPublicacion = async (imgId) => {
  const [imagen] = await pool.query('SELECT imagen_publicacion  FROM imagenes_publicacion WHERE imagen_id = ?', [imgId])
  return imagen
}

const imagenPublicacion = async (id) => {
  const [imagen] = await pool.query('SELECT imagen_publicacion FROM imagenes_publicacion WHERE publicacion_id = ?', [id])
  return imagen
}

const buscaPublicacion = async (id) => {
  const [publicacion] = await pool.query('SELECT * FROM publicaciones WHERE publicacion_id = ?', [id])
  return publicacion
}

const all = async () => {
  const [publicacion] = await pool.query(`SELECT p.publicacion_id, p.titulo, p.contenido, p.fecha_creacion, per.persona_nombre,
  per.email, r.nombre_rol, c.categoria_nombre, ip.imagen_publicacion, co.contenido AS comentario_contenido, co.fecha_creacion AS comentario_fecha_creacion
FROM publicaciones p
  LEFT JOIN personas per ON p.persona_id = per.persona_id
  LEFT JOIN roles r ON per.rol_id = r.rol_id
  LEFT JOIN publicacion_categoria pc ON p.publicacion_id = pc.publicacion_id
  LEFT JOIN categorias c ON pc.categoria_id = c.categoria_id
  LEFT JOIN imagenes_publicacion ip ON p.publicacion_id = ip.publicacion_id
  LEFT JOIN comentarios co ON p.publicacion_id = co.publicacion_id;`)
  return publicacion
}

const allPublicacion = async (id) => {
  const [publicacion] = await pool.query(`SELECT p.publicacion_id, p.titulo, p.contenido, p.fecha_creacion, per.persona_nombre,
    per.email, r.nombre_rol, c.categoria_nombre, ip.imagen_publicacion, co.contenido AS comentario_contenido, co.fecha_creacion AS comentario_fecha_creacion
  FROM publicaciones p
    LEFT JOIN personas per ON p.persona_id = per.persona_id
    LEFT JOIN roles r ON per.rol_id = r.rol_id
    LEFT JOIN publicacion_categoria pc ON p.publicacion_id = pc.publicacion_id
    LEFT JOIN categorias c ON pc.categoria_id = c.categoria_id
    LEFT JOIN imagenes_publicacion ip ON p.publicacion_id = ip.publicacion_id
    LEFT JOIN comentarios co ON p.publicacion_id = co.publicacion_id
    WHERE p.publicacion_id = ?`, [id])
  return publicacion
}

const publicacionCategoria = async (categoria) => {
  const [filtrarCategoria] = await pool.query(`SELECT p.publicacion_id, p.titulo, p.contenido, p.fecha_creacion, per.persona_nombre,
  per.email, r.nombre_rol, c.categoria_nombre, ip.imagen_publicacion, co.contenido AS comentario_contenido, co.fecha_creacion AS comentario_fecha_creacion
  FROM publicaciones p
  LEFT JOIN personas per ON p.persona_id = per.persona_id
  LEFT JOIN roles r ON per.rol_id = r.rol_id
  LEFT JOIN publicacion_categoria pc ON p.publicacion_id = pc.publicacion_id
  LEFT JOIN categorias c ON pc.categoria_id = c.categoria_id
  LEFT JOIN imagenes_publicacion ip ON p.publicacion_id = ip.publicacion_id
  LEFT JOIN comentarios co ON p.publicacion_id = co.publicacion_id WHERE c.categoria_nombre = ?`, [categoria])
  return filtrarCategoria
}

const publicacionTitulo = async (titulo) => {
  const [filtrarTitulo] = await pool.query(`SELECT p.publicacion_id, p.titulo, p.contenido, p.fecha_creacion, per.persona_nombre,
  per.email, r.nombre_rol, c.categoria_nombre, ip.imagen_publicacion, co.contenido AS comentario_contenido, co.fecha_creacion AS comentario_fecha_creacion
  FROM publicaciones p
  LEFT JOIN personas per ON p.persona_id = per.persona_id
  LEFT JOIN roles r ON per.rol_id = r.rol_id
  LEFT JOIN publicacion_categoria pc ON p.publicacion_id = pc.publicacion_id
  LEFT JOIN categorias c ON pc.categoria_id = c.categoria_id
  LEFT JOIN imagenes_publicacion ip ON p.publicacion_id = ip.publicacion_id
  LEFT JOIN comentarios co ON p.publicacion_id = co.publicacion_id
  WHERE p.titulo = ?;`, [titulo])
  return filtrarTitulo
}

const createPublicacion = async ({ titulo, contenido, personaId, fechaCreacion }) => {
  const [resultado] = await pool.execute('INSERT INTO publicaciones(titulo, contenido, persona_id, fecha_creacion) VALUES (?, ?, ?, ?) ', [titulo, contenido, personaId, fechaCreacion])

  return resultado.affectedRows === 1
}

const createImgenPublicacion = async ({ publicacionId, imagenPublicacion }) => {
  const [imagen] = await pool.execute('INSERT INTO imagenes_publicacion(publicacion_id, imagen_publicacion) VALUES (?, ?)', [publicacionId, imagenPublicacion])

  return imagen.affectedRows === 1
}

const updatePublicacion = async ({ id, titulo, contenido, personaId, fechaCreacion }) => {
  const [resultado] = await pool.execute('UPDATE publicaciones SET titulo = ?, contenido = ?, persona_id = ?, fecha_creacion = ? WHERE publicacion_id = ?', [titulo, contenido, personaId, fechaCreacion, id])

  return resultado.affectedRows === 1
}

const updateImgenPublicacion = async ({ imagenId, publicacionId, imagenPublicacion }) => {
  const [imagen] = await pool.execute('UPDATE imagenes_publicacion SET publicacion_id = ?, imagen_publicacion = ? WHERE imagen_id = ?', [publicacionId, imagenPublicacion, imagenId])

  return imagen.affectedRows === 1
}

const removePublicacion = async (id) => {
  try {
    await pool.query('START TRANSACTION')

    await pool.query('DELETE FROM publicacion_categoria WHERE publicacion_id = ?', [id])

    await pool.query('DELETE FROM imagenes_publicacion WHERE publicacion_id = ?', [id])

    const [resultado] = await pool.query('DELETE FROM publicaciones WHERE publicacion_id = ?', [id])

    await pool.query('COMMIT')

    return resultado.affectedRows === 1
  } catch (error) {
    // Revertir la transacción en caso de error
    await pool.query('ROLLBACK')
    throw error
  }
}

const removeImgenPublicacion = async (imagenId) => {
  const [imagen] = await pool.execute('DELETE FROM imagenes_publicacion WHERE imagen_id = ?', [imagenId])

  return imagen.affectedRows === 1
}

export default { buscaImagenPublicacion, buscaPublicacion, all, allPublicacion, publicacionCategoria, publicacionTitulo, createPublicacion, createImgenPublicacion, updatePublicacion, removePublicacion, imagenPublicacion, updateImgenPublicacion, removeImgenPublicacion }
