'use strict'

const chaiHttp = require('chai-http')
const app = require('../app')
let chai = require('chai')
const expect = chai.expect
chai.use(chaiHttp)

it('[GET /] should return HTTP 200 OK', () => {
  chai.request(app)
    .get('/')
    .end((err, res) => {
      expect(res).to.have.status(200)
    })
})
