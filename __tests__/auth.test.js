'use strict'

const test = require('ava')
const http = require('ava-http')

const URL = 'http://localhost:3000/auth'

test('[POST /auth/signup] should succeed', async t => {
  const body = {
    email: 'test@example.com',
    password: '123'
  }
  const res = await http.postResponse(URL + '/signup', { body })
  t.is(res.statusCode, 200)
})

test('[POST /auth/login] should succeed', async t => {
  const body = {
    email: 'test@example.com',
    password: '123'
  }
  const res = await http.postResponse(URL + '/login', { body })
  t.is(res.statusCode, 200)
})
