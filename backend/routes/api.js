const express = require('express')
const router = express.Router()
const keythereum = require('keythereum')
const Sequelize = require('sequelize')
const sequelize = require('../middleware/sequelize')
const Web3 = require('web3')
const networks = require('../middleware/web3').networks
const Account = require('../model/account')(sequelize, Sequelize.DataTypes)
const Keystore = require('../model/keystore')(sequelize, Sequelize.DataTypes)
const ERC20_TOKEN = require('../json/TestCoin.json')

// FIXME Get values from database
const CONTRACT_ADDRESS = '0x66e3e42a6f0f2690a1a5207047c26f5f6d73ecdb'
const DECIMAL = 18

router.get('/profile', (req, res, next) => {
  console.log('===== profile =====')
  console.log(req.user)
  res.json({
    message: 'This is secure api',
    account: req.user,
    token: req.query.secret_token
  })
})

// TODO Testing
router.get('/balance', (req, res, next) => {
  Account.findOne({ where: { email: req.user.email } }).then(account => {
    const userId = account.id
    Keystore.findOne({ where: { account_id: userId } }).then(keystore => {
      const myKeyObject = JSON.parse(keystore.content)
      let myWalletAddress = '0x' + myKeyObject.address
      console.log('My Wallet Address: ' + myWalletAddress)

      // Balance
      console.log('====== web3 ======')
      console.log(networks)
      const web3 = new Web3(new Web3.providers.HttpProvider(networks.rinkeby))
      web3.eth.getBalance(myWalletAddress, (error, weiBalance) => {
        if (!error) {
          const ethBalance = web3.utils.fromWei(weiBalance)
          const contract = new web3.eth.Contract(ERC20_TOKEN.abi, CONTRACT_ADDRESS)
          contract.methods.balanceOf(myWalletAddress).call((error, tokenBalance) => {
            if (!error) {
              const tscBalance = tokenBalance / (10 ** DECIMAL)
              console.log('=== Balance ===')
              console.log('ETH Balance: ' + ethBalance)
              console.log('TSC Balance: ' + tscBalance)
              res.json({
                userId: userId,
                myWalletAddress: myWalletAddress,
                ethBalance: ethBalance,
                tscBalance: tscBalance.toString()
              })
            } else {
              console.error(error)
            }
          })
        } else {
          console.error(error)
        }
      })
    })
  })
})

router.post('/tx', (req, res, next) => {
  console.log(req.user)
  res.json({
    message: 'This is secure api',
    account: req.user,
    token: req.query.secret_token
  })
})

module.exports = router
