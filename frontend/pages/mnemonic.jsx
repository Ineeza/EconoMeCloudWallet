// @flow
import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import { apiHost } from '../../backend/config'
import initialize from '../utils/initialize'
import Layout from '../components/BaseLayout'
import { JWT_KEY } from '../constants/keys'
// $FlowFixMe
import { Card } from 'tabler-react'

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

    // TODO Create Mnemonic
    // FIXME Use globally imported bip39 module
    var bip39 = require('bip39')
    const mnemonic = bip39.generateMnemonic()

    if (token) {
      const response = await axios.get(`/api/profile`)
      const user = response.data.account.email
      return {
        user,
        mnemonic
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

  render () {
    return (
      <Layout title='Mnemonic'>
        <Card title='Mnemonic Code'>
          <Card.Body>
            <strong>{this.state.mnemonic}</strong>
          </Card.Body>
        </Card>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(MnemonicPage)
