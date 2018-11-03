import React from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import initialize from '../utils/initialize'
import Layout from '../components/BaseLayout'
import {
  Button,
  Card,
  Form
} from 'tabler-react'

class Signup extends React.Component {
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
    this.props.authenticate({ email: this.state.email, password: this.state.password }, 'signup')
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

export default connect(null, actions)(Signup)
