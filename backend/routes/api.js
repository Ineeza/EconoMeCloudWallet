const express = require('express')
const router = express.Router()
const keythereum = require('keythereum')
const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
const { check, validationResult } = require('express-validator/check')
const { Account, Keystore, Token } = require('../model')
const networks = require('../middleware/web3').networks
const ERC20_TOKEN = require('../json/TestCoin.json')
const tokenRouter = require('./token')

module.exports = (app, server) => {
  // Routing secure api
  router.use('/token', tokenRouter(app, server))

  router.get('/profile', (req, res, next) => {
    const userId = req.user.id
    Account.findOne({ where: { id: userId } }).then(account => {
      res.json({
        message: 'This is secure api',
        user: req.user,
        account: account,
        token: req.query.secret_token
      })
    })
  })

  router.get('/balance', (req, res, next) => {
    const userId = req.user.id
    Keystore.findOne({ where: { account_id: userId } }).then(keystore => {
      const myKeyObject = JSON.parse(keystore.content)
      let myWalletAddress = '0x' + myKeyObject.address
      console.log('My Wallet Address: ' + myWalletAddress)

      const web3 = new Web3(new Web3.providers.HttpProvider(networks.rinkeby))
      web3.eth.getBalance(myWalletAddress, (error, weiBalance) => {
        if (!error) {
          const ethBalance = web3.utils.fromWei(weiBalance)
          Token.findAll({ where: { account_id: userId } }).then(tokens => {
            // Prepare promises for parallel requests
            let promises = []
            tokens.forEach((token) => {
              if (web3.utils.isAddress(token.contract_address)) {
                const contract = new web3.eth.Contract(ERC20_TOKEN.abi, token.contract_address)
                const promise = new Promise((resolve, reject) =>
                  contract.methods.balanceOf(myWalletAddress).call((error, balance) => {
                    // Get decimal from contract address
                    contract.methods.decimals().call((error, decimals) => {
                      if (error) { console.log(error) }
                    })
                    if (!error) {
                      resolve(balance)
                    } else {
                      console.error(error)
                    }
                  }).catch((error) => {
                    resolve()
                  })
                )
                promises.push(promise)
              }
            })

            Promise.all(promises).then(balances => {
              let tokensWithBalances = []
              for (var i in tokens) {
                const data = { info: tokens[i] }
                const object = Object.assign({ balance: balances[i] / (10 ** tokens[i].decimal) }, data)
                tokensWithBalances.push(object)
              }
              res.json({
                userId: userId,
                myWalletAddress: myWalletAddress,
                ethBalance: ethBalance,
                tokens: tokensWithBalances
              })
            }).catch((err) => {
              // In here we will get the higher-level error.
              res.json({})
            })
          })
        } else {
          console.error(error)
        }
      })
    })
  })

  router.post('/tx', [
    check('password').exists(),
    check('recipientAddress').exists(),
    check('amount').exists(),
    check('contractAddress').exists()
  ], (req, res, next) => {
    // Error handling
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const userId = req.user.id
    console.log('==== POST /tx ====')
    console.log(req.body)
    const password = req.body.password
    const recipientAddress = req.body.recipientAddress
    const amount = req.body.amount
    const contractAddress = req.body.contractAddress
    console.log('userId: ' + userId)
    console.log('recipientAddress: ' + recipientAddress)
    console.log('amount: ' + amount)

    Keystore.findOne({ where: { account_id: userId } }).then(keystore => {
      const myKeyObject = JSON.parse(keystore.content)
      let myWalletAddress = '0x' + myKeyObject.address
      console.log('My Wallet Address: ' + myWalletAddress)
      // Nonce
      const web3 = new Web3(new Web3.providers.HttpProvider(networks.rinkeby))
      const contract = new web3.eth.Contract(ERC20_TOKEN.abi, contractAddress)
      web3.eth.getTransactionCount(myWalletAddress).then((nonce) => {
        console.log('Nonce: ' + nonce)
        // Private Key
        const privateKey = keythereum.recover(password, myKeyObject)
        console.log('contract: ' + contract)
        // Signed Transaction
        let toAddress = recipientAddress

        // Get the decimals from the contract
        contract.methods.decimals().call((error, decimals) => {
          if (error) { console.log(error) }
          const decimalAmount = amount * (10 ** decimals)
          console.log('===== Creating Transaction =====')
          console.log('  amount: ' + decimalAmount)
          console.log('  toAddress: ' + toAddress)
          console.log('  gasPrice: ' + web3.utils.toHex(4.8 * 1e9))
          console.log('  gasLimit: ' + web3.utils.toHex(210000))
          console.log('  nounce: ' + web3.utils.toHex(nonce))
          // DEBUG
          const rawTransaction = {
            'from': myWalletAddress,
            'gasPrice': web3.utils.toHex(2 * 1e9),
            'gasLimit': web3.utils.toHex(210000),
            'to': contractAddress,
            'value': '0x0',
            'data': contract.methods.transfer(toAddress, decimalAmount).encodeABI(),
            'nonce': web3.utils.toHex(nonce)
          }
          const transaction = new Tx(rawTransaction)
          transaction.sign(privateKey)
          web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
            .on('transactionHash', (hash) => res.json({ 'transactionHash': hash }))
        })
      })
    })
  })

  router.post('/eth', [
    check('password').exists(),
    check('recipientAddress').exists(),
    check('amount').exists()
  ], (req, res, next) => {
    // Error handling
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    console.log('==== POST /eth ====')
    console.log(req.body)
    const userId = req.user.id
    const password = req.body.password
    const recipientAddress = req.body.recipientAddress
    const amount = req.body.amount
    console.log('userId: ' + userId)
    console.log('recipientAddress: ' + recipientAddress)
    console.log('amount: ' + amount)

    Keystore.findOne({ where: { account_id: userId } }).then(keystore => {
      const myKeyObject = JSON.parse(keystore.content)
      let myWalletAddress = '0x' + myKeyObject.address
      console.log('My Wallet Address: ' + myWalletAddress)
      // Nonce
      const web3 = new Web3(new Web3.providers.HttpProvider(networks.rinkeby))
      web3.eth.getTransactionCount(myWalletAddress).then((nonce) => {
        console.log('Nonce: ' + nonce)
        // Private Key
        const privateKey = keythereum.recover(password, myKeyObject)
        // Signed Transaction
        let toAddress = recipientAddress
        const decimalAmount = web3.utils.toWei(amount, 'ether')
        console.log('===== Creating Transaction =====')
        console.log('  amount(Wei): ' + decimalAmount)
        console.log('  amount(Hex): ' + web3.utils.toHex(decimalAmount))
        console.log('  toAddress: ' + toAddress)
        console.log('  gasPrice: ' + web3.utils.toHex(4.8 * 1e9))
        console.log('  gasLimit: ' + web3.utils.toHex(210000))
        console.log('  nounce: ' + web3.utils.toHex(nonce))
        // DEBUG
        const rawTransaction = {
          'from': myWalletAddress,
          'gasPrice': web3.utils.toHex(2 * 1e9),
          'gasLimit': web3.utils.toHex(210000),
          'to': recipientAddress,
          'value': web3.utils.toHex(decimalAmount),
          'data': '0x0',
          'nonce': web3.utils.toHex(nonce)
        }
        const transaction = new Tx(rawTransaction)
        transaction.sign(privateKey)
        web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
          .on('transactionHash', (hash) => res.json({ 'transactionHash': hash }))
      })
    })
  })

  return router
}
