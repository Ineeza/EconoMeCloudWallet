const Web3 = require('web3')

const RINKEBY_URL = 'https://rinkeby.infura.io/xyji23ngACpAtbvoO0MZ'

const options = {
  kdf: 'pbkdf2',
  cipher: 'aes-128-ctr',
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: 'hmac-sha256'
  }
}

let web3 = new Web3(new Web3.providers.HttpProvider(RINKEBY_URL))

module.exports = (web3, options)
