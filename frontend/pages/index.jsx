import React from 'react'
import { connect } from 'react-redux'
import initialize from '../utils/initialize'
import Layout from '../components/layout'

const Index = () => (
  <Layout title='Home'>
    <h2 className='title is-2'>EconoMe</h2>
    <p>Welcome</p>
  </Layout>
)

Index.getInitialProps = (ctx) => {
  console.log('===== CONTEXT Index =====')
  initialize(ctx)
}

export default connect()(Index)
