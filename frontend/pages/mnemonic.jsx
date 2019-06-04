// @flow
import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { bindActionCreators } from 'redux'
import bcrypt from 'bcryptjs'
import keythereum from 'keythereum'
//import ethereum from 'web3'
import actions from '../actions'
import { apiHost } from '../../backend/config'
import initialize from '../utils/initialize'
import Layout from '../components/BaseLayout'
import { JWT_KEY } from '../constants/keys'
// $FlowFixMe
import { Button, Card } from 'tabler-react'

const mapStateToProps = (state) => {
  return {}
}

const mapDispachToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators(actions, dispatch)
}

class MnemonicPage extends React.Component<Props, State> {
  static async getInitialProps (ctx) {
    initialize(ctx)
    const token = ctx.store.getState().authentication.token
    const axios = axiosBase.create({
      baseURL: apiHost,
      headers: {
        [JWT_KEY]: token
      }
    })

    if (token) {
      const response = await axios.get(`/api/profile`)
      const user = response.data.account.email
      return {
        user
      }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      mnemonic: props.mnemonic
    }
  }

  genPrivateKey = () => {
    // FIXME Use globally imported bip39 module
    const bip39 = require('bip39')
    const mnemonic = bip39.generateMnemonic()
    console.log('Generated a mnemonic')
    console.log(mnemonic)
    const password = 'test'

    // TODO Generate a private key
    bcrypt.hash(password, 10).then((hash) => {
      const params = { keyBytes: 32, ivBytes: 16 }
      const dk = keythereum.create(params)

      // Save keystore to database
      const keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, ethereum.options)
      const keystoreStr = JSON.stringify(keyObject)
      console.log(keystoreStr)
    })

    // TODO Create a keystore by password (like PIN code)
    // TODO Save the key into cookie (We shouldn't use local storage to store sensitive data)
  }

  render () {
    return (
      <Layout title='Mnemonic'>
        <Card title='Mnemonic Code'>
          <Card.Body>
            <strong>{this.state.mnemonic}</strong>
            <Button onClick={this.genPrivateKey} block icon='plus-circle' color='success' outline>Create new wallet</Button>
          </Card.Body>
        </Card>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(MnemonicPage)
