const bcrypt = require('bcrypt')
const winston = require('winston')
const LocalStrategy = require('passport-local').Strategy

const keythereum = require('keythereum')
const fs = require('fs')
const FP = require('filepath')
const Web3 = require('web3')
const options = {
  kdf: 'pbkdf2',
  cipher: 'aes-128-ctr',
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: 'hmac-sha256'
  }
}
let web3

module.exports = (passport, db) => {
  passport.use(new LocalStrategy((username, password, cb) => {
    console.log('========= Passport ===========')
    console.log('Password: ' + password)

    // Init
    const params = { keyBytes: 32, ivBytes: 16 }
    const dk = keythereum.create(params)

    // Web3
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
    } else {
      // Rinkeby Network
      web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/xyji23ngACpAtbvoO0MZ'))
    }

    // Pass userName and password as Http POST paramters
    const userName = username
    console.log('=== User Info ===')
    console.log('User Name: ' + userName)
    console.log('Password: ' + password)

    const keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options)
    const generatedFileName = keythereum.exportToFile(keyObject)

    db.query('SELECT id, username, password, type FROM users WHERE username=$1', [username], (err, result) => {
      if (err) {
        winston.error('Error when selecting user on login', err)
        return cb(err)
      }

      if (result.rows.length > 0) {
        const first = result.rows[0]
        bcrypt.compare(password, first.password, (err, res) => {
          if (err) { console.log(err) }
          if (res) {
            // Override file name as user name
            const fpFolder = FP.newPath() + '/'
            const oldFilePath = fpFolder + generatedFileName
            const newFilePath = fpFolder + 'keystore/' + first.id

            // Output the old and new file paths
            console.log('=== Keystore Path ===')
            console.log('oldFilePath: ' + oldFilePath)
            console.log('newFilePath: ' + newFilePath)

            // Create Keystore file as user ID
            fs.stat(newFilePath, (err, stats) => {
              if (err) {
                // Use the fs object's rename method to re-name the file
                fs.rename(oldFilePath, newFilePath, () => {
                  console.log('Keystore has been created.')
                  // Delete old file
                  fs.unlink(oldFilePath, () => {
                    console.log('Deleted old file.')
                  })
                })
              } else if (stats.isFile()) {
                console.log(userName + ' already exsits.')
                // Delete old file
                fs.unlink(oldFilePath, () => {
                  console.log('Deleted old file.')
                })
              }
            })
            cb(null, { id: first.id, username: first.username, type: first.type })
          } else {
            cb(null, false)
          }
        })
      } else {
        cb(null, false)
      }
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, cb) => {
    db.query('SELECT id, username, type FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
      if (err) {
        winston.error('Error when selecting user on session deserialize', err)
        return cb(err)
      }

      cb(null, results.rows[0])
    })
  })
}
