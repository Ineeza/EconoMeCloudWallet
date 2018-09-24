import React from 'react'
import { connect } from 'react-redux'
import initialize from '../utils/initialize'
import BaseLayout from '../components/baselayout'
import titleImg from '../static/wallet.png'
import { Card } from 'tabler-react'

const titleStyle = {
  textAlign: 'center'
}

const subTitleStyle = {
  textAlign: 'center',
  fontSize: '22px'
}

const imgStyle = {
  display: 'block',
  padding: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '25%'
}

const Index = () => (
  <BaseLayout>
    <Card>
      <Card.Body>
        <h1 style={titleStyle}>Create a wallet in seconds, using EconoMe API</h1>
        <p style={subTitleStyle}>Cryptocurrencies and Collectibles</p>
        <img style={imgStyle} src={titleImg} />
      </Card.Body>
    </Card>
  </BaseLayout>
)

Index.getInitialProps = (ctx) => {
  console.log('===== CONTEXT Index =====')
  initialize(ctx)
}

export default connect()(Index)
