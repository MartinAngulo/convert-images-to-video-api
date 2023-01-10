const asyncHandler = require('express-async-handler')
const videoshow = require('videoshow')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg')
const ffprobe = require('@ffprobe-installer/ffprobe')
const ffmpeg = require('fluent-ffmpeg')
const resize = require('../config/jimp/resize')
const fs = require('fs')
ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobe.path)

const convertImagesToVideo = asyncHandler(async (req, res) => {
  const images = req?.files

  await resize(images)

  const imagesMap = images.map((e, i) => ({
    path: `./public/assets/resize-imgs/${e.filename}`,
    loop: 2,
  }))

  const videoOptions = {
    fps: 30,
    // loop: 1, // seconds
    transition: true,
    transitionDuration: 0.3, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p',
  }
  const videoPath = `./public/assets/videos/Video-${images[0].originalname.slice(
    0,
    images[0].originalname.length - 4
  )}.mp4`
  videoshow(imagesMap, videoOptions)
    .save(videoPath)
    .on('start', function (command) {
      console.log('ffmpeg process started:', command)
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)
    })
    .on('end', function (output) {
      console.error('Video created in:', output)
      imagesMap.forEach((img) => fs.unlinkSync(img.path))
      images.forEach((img) => fs.unlinkSync(img.path))
    })

  res.json({ path: videoPath })
})

module.exports = convertImagesToVideo
