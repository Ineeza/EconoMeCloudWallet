const os = require('os')
const port = parseInt(process.env.PORT, 10) || 3000
const { app, front } = require('./app')

front.prepare().then(() => {
  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${os.hostname}:${port}`)
  })
})
