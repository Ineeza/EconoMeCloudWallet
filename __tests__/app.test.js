const request = require('supertest')
const { app } = require('../backend/app')

test('It should response the GET method', (done) => {
  request(app).get('/_check').then((response) => {
    expect(response.statusCode).toBe(200)
    done()
  })
})
