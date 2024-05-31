import { Router } from 'express'
import { createComentarios, indexId, removeComentarios, updateComentarios } from '../controllers/comentarios.controller.js'

const router = Router()

router.get('/:id/comentarios', indexId)

router.post('/:id/comentarios', createComentarios)

router.put('/:id/comentarios/:idComent', updateComentarios)

router.delete('/:id/comentarios/:idComent', removeComentarios)

export default router
