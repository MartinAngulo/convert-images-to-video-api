'use strict'
const Jimp = require('jimp')

const resize = async (images) => {
  if (!images.length) {
    return
  }
  const filesRezise = images.map((e) => {
    return new Promise((res, req) => {
      Jimp.read(e.path)
        .then((photo) => photo.resize(1024, 720))
        .then((photo) => photo.quality(60))
        .then((photo) => photo.write(`./public/assets/resize-imgs/${e.filename}`))
        .then((photo) => res(photo))
    })
  })
  return Promise.all(filesRezise)
}

module.exports = resize
