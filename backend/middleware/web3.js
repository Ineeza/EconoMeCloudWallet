const options = {
  kdf: 'pbkdf2',
  cipher: 'aes-128-ctr',
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: 'hmac-sha256'
  }
}

const networks = {
  mainnet: 'https://mainnet.infura.io/xyji23ngACpAtbvoO0MZ',
  ropsten: 'https://ropsten.infura.io/xyji23ngACpAtbvoO0MZ',
  rinkeby: 'https://rinkeby.infura.io/xyji23ngACpAtbvoO0MZ',
  kovan: 'https://kovan.infura.io/xyji23ngACpAtbvoO0MZ',
  infuranet: 'https://infuranet.infura.io/xyji23ngACpAtbvoO0MZ'
}

module.exports = {
  networks: networks,
  options: options
}
