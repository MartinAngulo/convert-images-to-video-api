'use strict'

const { Router } = require('express')
const router = Router()
const convertImagesToVideo = require('../controllers/convert-images-to-video-controller')
const { upload } = require('../config/multer/config')

router.route('/images').post(upload.any(), convertImagesToVideo)

module.exports = router
