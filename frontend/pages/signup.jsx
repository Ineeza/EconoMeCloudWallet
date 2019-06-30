import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { Dispatch } from 'redux'
import actions from '../actions'
import initialize from '../utils/initialize'
import Layout from '../components/BaseLayout'
// $FlowFixMe
import { Button, Card, Form, Alert } from 'tabler-react'

type Props = {
  email: string,
  password: string,
  authenticate: Function,
  setEmailOnSignup: Function,
  setPasswordOnSignup: Function,
  auth: Object
}

const mapStateToProps = (state) => {
  return {
    email: state.signupForm.email,
    password: state.signupForm.password,
    auth: state.authentication
  }
}

const mapDispachToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators(actions, dispatch)
}

class Signup extends React.Component<Props> {
  static getInitialProps (ctx) {
    initialize(ctx)
  }

  handleSubmit = (e) => {
    e.preventDefault() // Router doesn't redirect without this
    this.props.authenticate({ email: this.props.email, password: this.props.password }, 'signup')
  }

  setEmail (email) {
    this.props.setEmailOnSignup(email)
  }

  setPassword (password) {
    this.props.setPasswordOnSignup(password)
  }

  render () {
    return (
      <Layout>
        <Card>
          <Card.Header>
            <Card.Title>User Signup</Card.Title>
          </Card.Header>
          <Card.Body>
            {
              !(this.props.auth.status === 409) || <Alert type='danger'>User already exists.</Alert>
            }
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
                <Button type='submit' color='primary'>
                  Signup
                </Button>
              </Form.FieldSet>
            </Form>
          </Card.Body>
        </Card>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Signup)
