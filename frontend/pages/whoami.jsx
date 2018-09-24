import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { API } from '../../config'
import initialize from '../utils/initialize'
import Layout from '../components/baselayout/'
import { Alert, Card } from 'tabler-react'

const Whoami = ({ user }) => (
  <Layout title='Who Am I'>
    <Card title='User Status'>
      <Card.Body>
        {
          (user && <Alert type='success'>You are logged in as <strong>{user}</strong></Alert>) ||
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
    headers: {
      'X-ECW-ACCESS-TOKEN': token
    }
  })
  if (token) {
    const response = await axios({
      method: 'GET',
      url: `${API}/api/profile`
    })
    const user = response.data.account.email
    return {
      user
    }
  }
}

export default connect()(Whoami)
