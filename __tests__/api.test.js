const test = require('ava')
const http = require('ava-http')

const URL = 'http://localhost:3000/api'
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijp7ImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSJ9LCJpYXQiOjE1NDAwMjQ2MDR9.tmcczQH2NSGYb21BoBUD-EggSAJ5y8Tgh16lxcK6dDo'

test('[GET /api/balance] should return all properties', async t => {
  const headers = {
    'X-ECW-ACCESS-TOKEN': JWT
  }

  const res = await http.get(URL + '/balance', {headers})
  t.true(res.hasOwnProperty('userId'))
  t.true(res.hasOwnProperty('myWalletAddress'))
  t.true(res.hasOwnProperty('ethBalance'))
  t.true(res.hasOwnProperty('tscBalance'))
})

// FIXME Need gas pool
//test('[POST /api/tx] should send ERC20 token', async t => {
//  const headers = {
//    'X-ECW-ACCESS-TOKEN': JWT
//  }
//
//  const body = {
//    password: '123',
//    recipientAddress: '0xadB8AB1Dc55De9774fA81f1DEfC37Fc001D2Ff34',
//    tscAmount: 1
//  }
//
//  const res = await http.post(URL, {headers, body})
//  t.true(res.hasOwnProperty('transactionHash'))
//})
