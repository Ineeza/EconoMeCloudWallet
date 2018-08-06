'use strict'

const chaiHttp = require('chai-http')
const app = require('../app')
let chai = require('chai')
const expect = chai.expect
chai.use(chaiHttp)

it('[POST /users] should return HTTP 200 OK', () => {
  chai.request(app)
    .post('/users')
    .type('form')
    .send({
      'name': 'test_user_999',
      'password': '123'
    })
    .end((err, res) => {
      expect(res).to.have.status(200)
    })
})

it('[POST /users/send-signed-tx] should send signed transaction', () => {
  chai.request(app)
    .post('/users/send-signed-tx')
    .type('form')
    .send({
      'name': 'test_user_999',
      'password': '123'
    })
    .end((err, res) => {
    })
})
