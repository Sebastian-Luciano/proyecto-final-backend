import { pool } from '../config/db.js'

const all = async () => {
  const [roles] = await pool.query('SELECT * FROM roles')
  return roles
}

const allId = async (id) => {
  const [rolAdministrador] = await pool.query('SELECT * FROM roles WHERE rol_id = ?', [id])

  if (rolAdministrador.length > 0 && rolAdministrador[0].nombre_rol === 'Administrador') {
    const [roles] = await pool.query('SELECT * FROM roles')
    return roles
  } else {
    return 'Este ID no es Administrador'
  }
}
export default { all, allId }
