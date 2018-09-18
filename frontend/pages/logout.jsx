import React from 'react'
import Layout from '../components/baselayout/'
import actions from '../redux/actions'
import cookie from 'js-cookie'

cookie.remove('X-ECW-ACCESS-TOKEN')

const Logout = () => (
  <Layout>
    <h3>You have successfully logged out!</h3>
  </Layout>
)

Logout.getInitialProps = async (ctx) => {
  console.log('===== CONTEXT Logout =====')
}

export default Logout
