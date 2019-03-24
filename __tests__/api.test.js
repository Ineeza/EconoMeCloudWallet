const request = require('supertest')
const keythereum = require('keythereum')
const bcrypt = require('bcrypt')
const ethereum = require('web3')
const { app } = require('../backend/app')
const { Account, Keystore } = require('../backend/model')

const email = 'test1@api-test.com'
const password = '123'

beforeAll(async (done) => {
  // Create a user and keystore
  await bcrypt.hash(password, 10).then(async (hash) => {
    Account.findOrCreate({
      where: { email: email },
      defaults: { email: email, password: hash }
    }).spread((account, created) => {
      const params = { keyBytes: 32, ivBytes: 16 }
      const dk = keythereum.create(params)
      const keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, ethereum.options)
      const keystoreStr = JSON.stringify(keyObject)
      Keystore.findOrCreate({
        where: { account_id: account.id },
        defaults: { account_id: account.id, content: keystoreStr }
      }).then(keystore => { done() })
    })
  })
})

afterAll(async () => {
  // Delete test records
  await Account.findOne({ where: { email: email } }).then(async (account) => {
    await Keystore.destroy({ where: { account_id: account.id }, truncate: false })
    await Account.destroy({ where: { email: email }, truncate: false })
  })
})

test('[GET /api/balance] return token balances', (done) => {
  request(app)
    .post('/auth/login')
    .send({
      email: email,
      password: password
    })
    .then((response) => {
      expect(response.body).toHaveProperty('token')
      expect(response.statusCode).toBe(200)
      const jwt = response.body.token
      request(app)
        .get('/api/balance')
        .set({
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-ECW-ACCESS-TOKEN': jwt
        })
        .then((response) => {
          expect(response.body).toHaveProperty('myWalletAddress')
          expect(response.body).toHaveProperty('ethBalance')
          expect(response.statusCode).toBe(200)
          done()
        })
    })
})

test('[GET /api/profile] return account information', (done) => {
  request(app)
    .post('/auth/login')
    .send({
      email: email,
      password: password
    })
    .then((response) => {
      expect(response.body).toHaveProperty('token')
      expect(response.statusCode).toBe(200)
      const jwt = response.body.token
      request(app)
        .get('/api/profile')
        .set({
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-ECW-ACCESS-TOKEN': jwt
        })
        .then((response) => {
          expect(response.body).toHaveProperty('account')
          expect(response.body.account.email).toEqual(email)
          expect(response.body).toHaveProperty('message')
          expect(response.statusCode).toBe(200)
          done()
        })
    })
})
