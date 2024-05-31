import { Router } from 'express'
import { createPubCat, index, removePubCat, updatePubCat } from '../controllers/publicat.controller.js'

const router = Router()

router.get('/categoria/', index)

router.post('/categoria', createPubCat)

router.put('/categoria/:publicacionId/:categoriaId', updatePubCat)

router.delete('/categoria/:id', removePubCat)

export default router
