import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { API } from '../../config'
import initialize from '../utils/initialize'
import Layout from '../components/baselayout/'

const Whoami = ({ user }) => (
  <Layout title='Who Am I'>
    {
      (user && <h3 className='title is-3'>You are logged in as <strong className='is-size-2 has-text-primary'>{user}</strong>.</h3>) ||
      <h3 className='title is-3 has-text-danger'>You are not authenticated.</h3>
    }
  </Layout>
)

Whoami.getInitialProps = async (ctx) => {
  console.log('===== CONTEXT Whoami =====')
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
