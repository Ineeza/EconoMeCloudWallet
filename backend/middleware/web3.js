// @flow strict

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
  mainnet: 'https://mainnet.infura.io/v3/a3e73419953548babeebc5a327f62f56',
  ropsten: 'https://ropsten.infura.io/v3/a3e73419953548babeebc5a327f62f56',
  rinkeby: 'https://rinkeby.infura.io/v3/a3e73419953548babeebc5a327f62f56',
  kovan: 'https://kovan.infura.io/v3/a3e73419953548babeebc5a327f62f56',
  infuranet: 'https://infuranet.infura.io/v3/a3e73419953548babeebc5a327f62f56'
}

module.exports = {
  networks: networks,
  options: options
}
