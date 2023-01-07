'use strict'

const multer = require('multer')
const { TYPES_IMAGES, TYPES_VIDEOS } = require('./fileTypes')
const { FIELDS_NAMES } = require('./fieldsNames')

//config to multiple files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (
//       req.baseUrl === '/api/images' &&
//       FIELDS_NAMES.includes(file.fieldname) &&
//       TYPES_IMAGES.includes(file.mimetype)
//     ) {
//       cb(null, './public/assets/img')
//       return
//     }
//     if (FIELDS_NAMES.includes(file.fieldname) && TYPES_VIDEOS.includes(file.mimetype)) {
//       cb(null, './public/assets/videos')
//       return
//     }
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname.replace(/\s+/g, ''))
//   },
// })
// const upload = multer({ storage: storage, limits: { fileSize: 25000000 } })
// const uploadVideo = multer({ storage: storage, limits: { fileSize: 629145600 } })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets/imgs')
    return
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname.replace(/\s+/g, ''))
  },
})
const upload = multer({ storage: storage })

module.exports = { upload }
