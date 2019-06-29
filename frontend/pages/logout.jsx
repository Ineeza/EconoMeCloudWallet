// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { Dispatch } from 'redux'
import actions from '../actions'
import Layout from '../components/BaseLayout'
import cookie from 'js-cookie'
// $FlowFixMe
import { Alert, Card } from 'tabler-react'
import { JWT_KEY } from '../constants/keys'

type Props = {
  setLogout: Function
}

cookie.remove(JWT_KEY)

const mapStateToProps = (state) => {
  return state
}

const mapDispachToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators(actions, dispatch)
}

class Logout extends React.Component<Props> {
  render () {
    this.props.setLogout()
    return (
      <Layout>
        <Card title='Logout'>
          <Card.Body>
            <Alert type='warning'>You have successfully logged out!</Alert>
          </Card.Body>
        </Card>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Logout)
