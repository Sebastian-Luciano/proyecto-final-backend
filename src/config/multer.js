import multer from 'multer'

export let nuevoNombreFotoPerfil = null
export let nuevoNombreImagenPublicacion = null

const storageFotoPerfil = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/foto_perfil')
  },
  filename: function (req, file, cb) {
    nuevoNombreFotoPerfil = `${Date.now()}-${file.originalname}`
    cb(null, nuevoNombreFotoPerfil)
  }
})

const storageImagenPublicacion = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/img_publicacion')
  },
  filename: function (req, file, cb) {
    nuevoNombreImagenPublicacion = `${Date.now()}-${file.originalname}`
    cb(null, nuevoNombreImagenPublicacion)
  }
})

const imageFilter = (req, file, cb) => {
  const mimeType = file.mimetype
  const mimePermitidos = ['image/png', 'image/jpeg']

  if (mimePermitidos.includes(mimeType)) {
    return cb(null, true)
  } else {
    cb(new Error('Archivo no aceptado'))
  }
}

export const uploadFotoPerfil = multer({ storage: storageFotoPerfil, fileFilter: imageFilter })

export const uloadImagenPublicacion = multer({ storage: storageImagenPublicacion, fileFilter: imageFilter })
