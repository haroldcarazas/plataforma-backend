import multer, { diskStorage } from 'multer'

const videosStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/videos')
  },
  filename: function (req, file, cb) {
    const newName = `${Date.now()}-${file.originalname}`
    cb(null, newName)
  }
})

const videosFilter = (req, file, cb) => {
  const { mimetype } = file
  const filesAllowed = ['videos/mp4', 'video/mpeg', 'video/webm']

  if (filesAllowed.includes(mimetype)) {
    return cb(null, true)
  }

  cb(new Error('Solo se permiten archivos de video'))
}

export const videosUpload = multer({ storage: videosStorage, fileFilter: videosFilter })
