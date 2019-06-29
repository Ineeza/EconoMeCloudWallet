// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { Dispatch } from 'redux'
import actions from '../actions'
import initialize from '../utils/initialize'
import BaseLayout from '../components/BaseLayout'
// $FlowFixMe
import { Button, Card, Form } from 'tabler-react'

type Props = {
  email: string,
  password: string,
  authenticate: Function,
  setEmailOnLogin: Function,
  setPasswordOnLogin: Function
}

const mapStateToProps = (state) => {
  return {
    email: state.loginForm.email,
    password: state.loginForm.password
  }
}

const mapDispachToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators(actions, dispatch)
}

class Login extends React.Component<Props> {
  static getInitialProps (ctx) {
    initialize(ctx)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.authenticate({ email: this.props.email, password: this.props.password }, 'login')
  }

  setEmail (email) {
    this.props.setEmailOnLogin(email)
  }

  setPassword (password) {
    this.props.setPasswordOnLogin(password)
  }

  render () {
    return (
      <BaseLayout>
        <Card>
          <Card.Header>
            <Card.Title>User Login</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form
              onSubmit={this.handleSubmit}
              className='container'
            >
              <Form.FieldSet>
                <Form.Group label='Username' isRequired>
                  <Form.Input
                    className='input'
                    type='text'
                    placeholder='Username'
                    required
                    value={this.props.email}
                    onChange={(e) => this.setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group label='Password' isRequired>
                  <Form.Input
                    className='input'
                    type='password'
                    placeholder='Password'
                    required
                    value={this.props.password}
                    onChange={(e) => this.setPassword(e.target.value)}
      />
                </Form.Group>
                <Button pill type='submit' color='primary' size='lg' block>
                  Login
                </Button>
              </Form.FieldSet>
            </Form>
          </Card.Body>
        </Card>
      </BaseLayout>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Login)
