// @flow
import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { apiHost } from '../../backend/config'
import initialize from '../utils/initialize'
import Layout from '../components/BaseLayout'
import { JWT_KEY } from '../constants/keys'
// $FlowFixMe
import { Card } from 'tabler-react'

const Mnemonic = ({ user, mnemonic }: Object) => (
  <Layout title='Mnemonic'>
    <Card title='Mnemonic Code'>
      <Card.Body>
        <strong>{mnemonic}</strong>
      </Card.Body>
    </Card>
  </Layout>
)

Mnemonic.getInitialProps = async (ctx) => {
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
  const bip39 = require('bip39')
  const mnemonic = bip39.generateMnemonic()
  console.log(mnemonic)

  if (token) {
    const response = await axios.get(`/api/profile`)
    const user = response.data.account.email
    return {
      user,
      mnemonic
    }
  }
}

export default connect()(Mnemonic)
