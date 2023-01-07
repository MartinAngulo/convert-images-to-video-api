'use strict'

const app = require('./config/server/server-config')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`.yellow.bold))
