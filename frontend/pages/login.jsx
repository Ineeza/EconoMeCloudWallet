import React from 'react'
import actions from '../actions'
import initialize from '../utils/initialize'
import BaseLayout from '../components/BaseLayout'
import { connect } from 'react-redux'
import {
  Button,
  Card,
  Form
} from 'tabler-react'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  static getInitialProps (ctx) {
    initialize(ctx)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.authenticate({ email: this.state.email, password: this.state.password }, 'login')
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
              onSubmit={this.handleSubmit.bind(this)}
              className='container'
            >
              <Form.FieldSet>
                <Form.Group label='Unique Username' isRequired>
                  <Form.Input
                    className='input'
                    type='text'
                    placeholder='Unique Username'
                    required
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group label='Password' isRequired>
                  <Form.Input
                    className='input'
                    type='password'
                    placeholder='Password'
                    required
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />
                </Form.Group>
                <Button type='submit' color='primary'>
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

export default connect(null, actions)(Login)
