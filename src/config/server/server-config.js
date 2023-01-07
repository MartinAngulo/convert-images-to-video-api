'use strict'

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const colors = require('colors')
const apiRoutes = require('../../routes')
const path = require('path')

// Server Config
dotenv.config()

//apply middlewares
const app = express()

app.use(cors())
app.use(express.json())

//  Server Routes
app.use('/api', apiRoutes)

// app.use('/public/*', checkOrigin)
app.use('/public', express.static(path.join(__dirname, '../../../public')))

// Server Middlewares
// app.use(notFound)
// app.use(errorHandler)

module.exports = app
