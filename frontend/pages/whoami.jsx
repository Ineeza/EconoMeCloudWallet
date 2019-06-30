import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { apiHost } from '../../backend/config'
import initialize from '../utils/initialize'
import Layout from '../components/BaseLayout'
import { JWT_KEY } from '../constants/keys'
// $FlowFixMe
import { Alert, Card } from 'tabler-react'

const Whoami = ({ account }: Object) => (
  <Layout title='Who Am I'>
    <Card title='User Status'>
      <Card.Body>
        {
          (account && <Alert type='success'>You are logged in as <strong>{account.email}</strong></Alert>) ||
          <Alert type='danger'>You are not authenticated.</Alert>
        }
      </Card.Body>
    </Card>
  </Layout>
)

Whoami.getInitialProps = async (ctx) => {
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
    const account = response.data.account
    return {
      account
    }
  }
}

export default connect()(Whoami)
