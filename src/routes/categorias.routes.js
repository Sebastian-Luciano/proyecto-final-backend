import { Router } from 'express'
import { createCategorias, index, indexPublicacionCategoria, removeCategorias, updateCategorias } from '../controllers/categorias.controller.js'

const router = Router()

router.get('/', index)
router.get('/', indexPublicacionCategoria)
router.post('/', createCategorias)
router.put('/:id', updateCategorias)
router.delete('/:id', removeCategorias)

export default router
