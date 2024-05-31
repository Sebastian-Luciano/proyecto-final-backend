import { Router } from 'express'
import { indexPersonas, removePersonas, storePersonas, updatePersonas } from '../controllers/usuarios.controller.js'
import { uploadFotoPerfil } from '../config/multer.js'

const router = Router()

router.get('/:id', indexPersonas)
router.delete('/:id', removePersonas)
router.post('/', uploadFotoPerfil.single('fotoPerfil'), storePersonas)
router.put('/:id', uploadFotoPerfil.single('fotoPerfil'), updatePersonas)

export default router
