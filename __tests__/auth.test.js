const request = require('supertest')
const { app } = require('../backend/app')

test('[POST /auth/signup] signup successfully', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      email: 'test@example.com',
      password: '123'
    })
    .then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
})

test('[POST /auth/login] login successfully', (done) => {
  request(app)
    .post('/auth/login')
    .send({
      email: 'test@example.com',
      password: '123'
    })
    .then((response) => {
      expect(response.body).toHaveProperty('token')
      expect(response.statusCode).toBe(200)
      done()
    })
})

test('[POST /auth/login] detect wrong password', (done) => {
  request(app)
    .post('/auth/login')
    .send({
      email: 'test@example.com',
      password: '1234'
    })
    .then((response) => {
      expect(response.body).toHaveProperty('error')
      done()
    })
})
