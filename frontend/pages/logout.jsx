import React from 'react'
import Layout from '../components/BaseLayout'
import cookie from 'js-cookie'
import { Alert, Card } from 'tabler-react'
import { JWT_KEY } from '../constants/keys'

cookie.remove(JWT_KEY)

const Logout = () => (
  <Layout>
    <Card title='Logout'>
      <Card.Body>
        <Alert type='warning'>You have successfully logged out!</Alert>
      </Card.Body>
    </Card>
  </Layout>
)

Logout.getInitialProps = async (ctx) => {
  console.log('===== Logout =====')
}

export default Logout
