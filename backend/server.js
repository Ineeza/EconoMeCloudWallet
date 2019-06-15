const os = require('os')
const port = parseInt(process.env.PORT, 10) || 3000
const { app, front } = require('./app')
const logger = require('./middleware/logger')

front.prepare().then(() => {
  app.listen(port, (err) => {
    if (err) throw err
    logger.info(`> Ready on http://${os.hostname}:${port}`)
  })
})
