const request = require('supertest')
const { app } = require('../backend/app')

test('[GET /_check] check whether server works fine.', (done) => {
  request(app).get('/_check').then((response) => {
    expect(response.statusCode).toBe(200)
    done()
  })
})
