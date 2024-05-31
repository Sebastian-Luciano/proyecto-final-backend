import { Router } from 'express'
import { getImagenesPublicacion, createImgenesPublicacion, createPublicaciones, index, indexPublicacion, publicacionCategoria, publicacionTitulo, removeImgenPublicacion, removePublicaciones, updateImgenesPublicacion, updatePublicaciones } from '../controllers/publicaciones.controller.js'
import { uloadImagenPublicacion } from '../config/multer.js'

const router = Router()

router.get('/', index)
router.get('/:id', indexPublicacion)
router.get('/:id/imagenes/', getImagenesPublicacion)
router.get('/categoria/:categoria', publicacionCategoria)
router.get('/titulo/:titulo', publicacionTitulo)

router.post('/:id/imagenes/', uloadImagenPublicacion.single('imagenPublicacion'), createImgenesPublicacion)
router.post('/', createPublicaciones)

router.put('/:id/imagenes/:imagenId', uloadImagenPublicacion.single('imagenPublicacion'), updateImgenesPublicacion)
router.put('/:id', updatePublicaciones)

router.delete('/:id/imagenes/:imgId', removeImgenPublicacion)
router.delete('/:id', removePublicaciones)

export default router
