import express, { json } from 'express'
import { PORT, originsAllowed } from './config/config.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import publicacionesRoutes from './routes/publicaciones.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'
import comentariosRoutes from './routes/comentarios.routes.js'
import publicacionCategoriasRoutes from './routes/publicat.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import { pool } from './config/db.js'
import swaggerUi from 'swagger-ui-express'
import jsonDocs from './config/swagger-output.json' assert {type: 'json'}
const app = express()

app.use(express.json())
app.use((req, res, next) => {
  const { origin } = req.headers

  if (originsAllowed.includes(origin) || origin === undefined) {
    res.setHeader('Access-Control-Allow-Origin', origin ?? '*')
    next()
  }
})

const autenticarAdmin = async (req, res, next) => {
  try {
    const rolId = req.headers.rolid

    if (!rolId) return res.status(401).json({ message: 'Falta el token de autenticación' })

    const [usuario] = await pool.execute('SELECT p.rol_id, r.nombre_rol FROM personas p JOIN roles r ON p.rol_id = r.rol_id WHERE r.rol_id = ?', [rolId])

    if (usuario.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' })

    if (usuario[0].nombre_rol !== 'Administrador') return res.status(403).json({ message: 'Acceso denegado' })
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(jsonDocs))
app.use('/api/roles/', rolesRoutes)
app.use('/api/usuarios/', usuariosRoutes)
app.use('/api/publicaciones/', publicacionesRoutes)
app.use('/api/publicaciones/', comentariosRoutes)
app.use('/api/categorias/', autenticarAdmin, categoriasRoutes)

app.use('/api/publicacion/', publicacionCategoriasRoutes)

app.listen(PORT, () => console.log(`Application on http://localhost:${PORT}`))
