import React from 'react'
import Modal from 'react-modal'
import { Form, Button } from 'tabler-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import actions from '../actions'
import { JWT_KEY } from '../constants/keys'

const mapStateToProps = (state) => {
  return {
    tokens: state.tokenList.tokens,
    targetContract: state.tokenList.targetContract
  }
}

const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

class SendTokenModal extends React.Component {
  constructor (props) {
    super(props)
    const jwt = cookie.get(JWT_KEY)
    this.state = {
      jwt: jwt,
      contractAddress: '',
      name: '',
      symbol: '',
      decimal: ''
    }
  }

  sendToken = () => {
    this.props.sendToken(this.state.jwt, {
      password: this.state.password,
      recipientAddress: this.state.recipientAddress,
      amount: this.state.amount,
      contractAddress: this.props.targetContract
    })
    this.props.handleCloseSendTokenModal()
  }

  render () {
    return (
      <Modal isOpen={this.props.isSendTokenModal} contentLabel='Modal'>
        <Form.FieldSet>
          <Form.Group label='Recipient Address' isRequired>
            <Form.Input
              name='recipient-address'
              placeholder=''
              value={this.state.recipientAddress}
              onChange={(e) => this.setState({ recipientAddress: e.target.value })}
            />
          </Form.Group>
          <Form.Group label='Amount' isRequired>
            <Form.Input
              name='amount'
              placeholder=''
              value={this.state.amount}
              onChange={(e) => this.setState({ amount: e.target.value })}
            />
          </Form.Group>
          <Form.Group label='Password' isRequired>
            <Form.Input
              name='password'
              placeholder=''
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>
        </Form.FieldSet>
        <Button.List align='center'>
          <Button onClick={this.props.handleCloseSendTokenModal} icon='x-circle' color='secondary'>Cancel</Button>
          <Button onClick={this.sendToken} icon='plus-circle' color='success'>Send tokens</Button>
        </Button.List>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(SendTokenModal)
