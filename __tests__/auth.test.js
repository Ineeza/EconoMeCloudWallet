const request = require('supertest')
const { app } = require('../backend/app')
const { Account, Keystore } = require('../backend/model')

const email = 'test1@auth-test.com'
const password = '123'

afterAll(async () => {
  // Delete test records
  await Account.findOne({ where: { email: email } }).then(async (account) => {
    await Keystore.destroy({ where: { account_id: account.id }, truncate: false })
    await Account.destroy({ where: { email: email }, truncate: false })
  })
})

test('[POST /auth/signup] signup successfully', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      email: email,
      password: password,
    })
    .then((response) => {
      expect(response.body).toHaveProperty('account')
      expect(response.body.account).toHaveProperty('email')
      expect(response.body.account.email).toEqual(email)
      expect(response.body.message).toEqual('Signup successful')
      expect(response.statusCode).toBe(200)
      done()
    })
})

test('[POST /auth/signup] reject if username is already used', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      email: email,
      password: password,
    })
    .then((response) => {
      // 409 Conflict
      expect(response.statusCode).toBe(409)
      done()
    })
})

test('[POST /auth/login] login successfully', (done) => {
  request(app)
    .post('/auth/login')
    .send({
      email: email,
      password: password,
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
      email: email,
      password: '1234',
    })
    .then((response) => {
      expect(response.body).toHaveProperty('error')
      done()
    })
})
