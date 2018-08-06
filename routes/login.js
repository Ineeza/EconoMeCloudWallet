const express = require('express')
const router = express.Router()
const keythereum = require('keythereum')
const fs = require('fs')
const FP = require('filepath')
const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
const Erc20Token = require('../json/TestCoin.json')
const contractAddress = '0x66e3e42a6f0f2690a1a5207047c26f5f6d73ecdb'
const decimals = 18
let recipientAddress
let tscAmount
let web3

module.exports = (passport) => {
  router.get('/', (req, res, next) => {
    res.render('login')
  })

  router.post('/', passport.authenticate('local', { failureRedirect: '/' }), (req, res, next) => {
    console.log(req.user)
    if (req.user.type === 'admin') {
      res.redirect('/dashboard')
    } else {
      res.redirect('/')
    }
  })

  router.get('/dashboard', (req, res, next) => {
    const userName = req.user.username
    const fpFolder = FP.newPath() + '/'
    const keystorePath = fpFolder + 'keystore/' + req.user.id

    render(res, keystorePath, userName)
  })

  router.post('/tx', (req, res, next) => {
    console.log('==== Send signed transaction ====')

    // Web3
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
    } else {
      // Rinkeby Network
      web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/xyji23ngACpAtbvoO0MZ'))
    }

    // Validation
    let userName = req.user.username
    let password = 'default'
    if (req.body.recipientAddress !== null && req.body.recipientAddress !== '' &&
        req.body.tscAmount !== null && req.body.tscAmount !== '' &&
        req.body.password !== null && req.body.password !== ''
    ) {
      recipientAddress = req.body.recipientAddress
      tscAmount = req.body.tscAmount
      password = req.body.password
      console.log('=== User Info ===')
      console.log('Recipient Address: ' + recipientAddress)
      console.log('TSC Amount: ' + tscAmount)
      console.log('User Name: ' + userName)
      console.log('Password: ' + password)
    }

    const fpFolder = FP.newPath() + '/'
    const keystorePath = fpFolder + 'keystore/' + req.user.id

    // Wallet
    fs.stat(keystorePath, (stats) => {
      console.log(userName + ' already exsits.')
      sendTx(res, keystorePath, userName, password, recipientAddress, tscAmount)
    })
  })

  return router
}

function render (res, keystorePath, userName) {
  const myKeyObject = importFromUser(keystorePath)
  let myWalletAddress = '0x' + myKeyObject.address
  console.log('My Wallet Address: ' + myWalletAddress)

  // Web3
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
  } else {
    // Rinkeby Network
    web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/xyji23ngACpAtbvoO0MZ'))
  }

  // Balance
  web3.eth.getBalance(myWalletAddress, (error, weiBalance) => {
    if (!error) {
      const ethBalance = web3.utils.fromWei(weiBalance)
      const contract = new web3.eth.Contract(Erc20Token.abi, contractAddress)
      contract.methods.balanceOf(myWalletAddress).call((error, tokenBalance) => {
        if (!error) {
          const tscBalance = tokenBalance / (10 ** decimals)
          console.log('=== Balance ===')
          console.log('ETH Balance: ' + ethBalance)
          console.log('TSC Balance: ' + tscBalance)
          res.render('dashboard', {
            userName: userName,
            myWalletAddress: myWalletAddress,
            ethBalance: ethBalance,
            tscBalance: tscBalance
          })
        } else {
          console.error(error)
        }
      })
    } else {
      console.error(error)
    }
  })
}

function sendTx (res, keystorePath, userName, password, recipientAddress, tscAmount) {
  const myKeyObject = importFromUser(keystorePath)
  let myWalletAddress = '0x' + myKeyObject.address
  console.log('My Wallet Address: ' + myWalletAddress)
  // Nonce
  web3.eth.getTransactionCount(myWalletAddress).then((nonce) => {
    console.log('Nonce: ' + nonce)
    // Private Key
    const privateKey = keythereum.recover(password, myKeyObject)
    console.log('Private Key: ' + privateKey.toString('base64'))
    const contract = new web3.eth.Contract(Erc20Token.abi, contractAddress)
    // Signed Transaction
    let toAddress = recipientAddress
    const amount = tscAmount * (10 ** decimals)
    const rawTransaction = {
      'from': myWalletAddress,
      'gasPrice': web3.utils.toHex(2 * 1e9),
      'gasLimit': web3.utils.toHex(210000),
      'to': contractAddress,
      'value': '0x0',
      'data': contract.methods.transfer(toAddress, amount).encodeABI(),
      'nonce': web3.utils.toHex(nonce)
    }
    console.log(rawTransaction)
    const transaction = new Tx(rawTransaction)
    transaction.sign(privateKey)
    web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('receipt', console.log)
  })

  // Balance
  web3.eth.getBalance(myWalletAddress, (error, weiBalance) => {
    if (!error) {
      const ethBalance = web3.utils.fromWei(weiBalance)
      const contract = new web3.eth.Contract(Erc20Token.abi, contractAddress)
      contract.methods.balanceOf(myWalletAddress).call((error, tokenBalance) => {
        if (!error) {
          const tscBalance = tokenBalance / (10 ** decimals)
          console.log('=== Balance ===')
          console.log('ETH Balance: ' + ethBalance)
          console.log('TSC Balance: ' + tscBalance)
          res.render('dashboard', {
            userName: userName,
            myWalletAddress: myWalletAddress,
            ethBalance: ethBalance,
            tscBalance: tscBalance
          })
        } else {
          console.error(error)
        }
      })
    } else {
      console.error(error)
    }
  })
}

function importFromUser (filepath) {
  var fs = require('fs')
  return JSON.parse(fs.readFileSync(filepath))
}
