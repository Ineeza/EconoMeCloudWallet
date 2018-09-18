import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/baselayout/'
import actions from '../redux/actions'

const Logout = () => (
  <Layout>
    <h3>You have successfully logged out!</h3>
  </Layout>
)

Logout.getInitialProps = async (ctx) => {
  console.log('===== CONTEXT Logout =====')
  actions.deauthenticate()
}

export default connect()(Logout)
