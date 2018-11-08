import React from 'react'
import { connect } from 'react-redux'
import initialize from '../utils/initialize'
import BaseLayout from '../components/BaseLayout'
import titleImg from '../static/wallet.png'
import { Card } from 'tabler-react'
import { CookiesProvider } from 'react-cookie'

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
  <CookiesProvider>
    <BaseLayout>
      <Card>
        <Card.Body>
          <h1 style={titleStyle}>Create a wallet in seconds, using EconoMe API</h1>
          <p style={subTitleStyle}>Cryptocurrencies and Collectibles</p>
          <img style={imgStyle} src={titleImg} />
        </Card.Body>
      </Card>
    </BaseLayout>
  </CookiesProvider>
)

Index.getInitialProps = (ctx) => {
  initialize(ctx)
}

export default connect()(Index)
