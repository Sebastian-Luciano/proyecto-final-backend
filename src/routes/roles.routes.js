import { Router } from 'express'
import { index, indexId } from '../controllers/roles.controller.js'

const router = Router()

router.get('/', index)
router.get('/:id', indexId)

export default router
