import React from 'react'
import { connect } from 'react-redux'
import initialize from '../utils/initialize'
import BaseLayout from '../components/baselayout'

const Index = () => (
  <BaseLayout>
    <h2 className='title is-2'>EconoMe</h2>
    <p>Welcome</p>
  </BaseLayout>
)

Index.getInitialProps = (ctx) => {
  console.log('===== CONTEXT Index =====')
  initialize(ctx)
}

export default connect()(Index)
