import { pool } from '../config/db.js'

const fotoPersona = async (id) => {
  const [foto] = await pool.query('SELECT foto_perfil FROM personas WHERE persona_id = ?', [id])
  return foto
}

const allPersona = async (id) => {
  const [roles] = await pool.query('SELECT nombre_rol FROM roles WHERE rol_id = ?', [id])

  if (roles.length > 0 && roles[0].nombre_rol === 'Administrador') {
    // Si el usuario es administrador, obtener todos los usuarios
    const [usuarios] = await pool.query('SELECT * FROM personas')
    return usuarios
  } else {
    // Si el usuario no es administrador, obtener solo su propio registro
    const [usuarios] = await pool.query('SELECT * FROM personas WHERE persona_id = ?', [id])
    return usuarios
  }
}

const removePersona = async (id) => {
  const [resultado] = await pool.execute('DELETE FROM personas WHERE persona_id = ?', [id])

  return resultado.affectedRows === 1
}

const createPersona = async ({ nombrePersona, email, password, rolId, fotoPerfil }) => {
  const [resultado] = await pool.execute('INSERT INTO personas(persona_nombre, email, contrasena, rol_id, foto_perfil) VALUES(?, ?, ?, ?, ?)', [nombrePersona, email, password, rolId, fotoPerfil])

  return resultado.affectedRows === 1
}

const updatePersona = async ({ id, nombrePersona, email, password, rolId, fotoPerfil }) => {
  const [resultado] = await pool.execute('UPDATE personas SET persona_nombre = ?, email = ?, contrasena = ?, rol_id = ?, foto_perfil = ? WHERE persona_id = ?', [nombrePersona, email, password, rolId, fotoPerfil, id])

  return resultado.affectedRows === 1
}

export default { fotoPersona, allPersona, removePersona, createPersona, updatePersona }
