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
    tokens: state.tokenList.tokens
  }
}

const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

class CreateWalletModal extends React.Component {
  constructor (props) {
    super(props)
    const jwt = cookie.get(JWT_KEY)
    this.state = {
      jwt: jwt,
      name: '',
      symbol: '',
      decimal: ''
    }
  }

  sendEth = () => {
    this.props.sendEth(this.state.jwt, {
      password: this.state.password,
      recipientAddress: this.state.recipientAddress,
      amount: this.state.amount
    })
    this.props.handleCloseCreateWalletModal()
  }

  render () {
    return (
      <Modal isOpen={this.props.isCreateWalletModal} contentLabel='Modal'>
        <Form.FieldSet>
          <Form.Group label='Recipient Address' isRequired>
            <Form.Input
              name='recipient-address'
              placeholder=''
              value={this.state.recipientAddress}
              onChange={(e) => this.setState({ recipientAddress: e.target.value })}
            />
          </Form.Group>
          <Form.Group label='Amount(ETH)' isRequired>
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
          <Button onClick={this.props.handleCloseCreateWalletModal} icon='x-circle' color='secondary'>Cancel</Button>
          <Button onClick={this.sendEth} icon='plus-circle' color='success'>Send ETH</Button>
        </Button.List>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(CreateWalletModal)
