// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { Dispatch } from 'redux'
import actions from '../actions'
import initialize from '../utils/initialize'
import Layout from '../components/BaseLayout'
// $FlowFixMe
import { Button, Card, Form } from 'tabler-react'

type Props = {
  email: string,
  password: string,
  authenticate: Function,
  setEmail: Function,
  setPassword: Function
}

const mapStateToProps = (state) => {
  return {
    email: state.signupForm.email,
    password: state.signupForm.password
  }
}

const mapDispachToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators(actions, dispatch)
}

class Signup extends React.Component<Props> {
  static getInitialProps (ctx) {
    initialize(ctx)
  }

  handleSubmit (e) {
    this.props.authenticate({ email: this.props.email, password: this.props.password }, 'signup')
  }

  setEmail (email) {
    this.props.setEmail(email)
  }

  setPassword (password) {
    this.props.setPassword(password)
  }

  render () {
    return (
      <Layout>
        <Card>
          <Card.Header>
            <Card.Title>User Signup</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form
              onSubmit={() => this.handleSubmit(this)}
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
