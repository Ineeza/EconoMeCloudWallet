import React from 'react'
import Modal from 'react-modal'
import { Form, Button } from 'tabler-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import actions from '../actions'

const mapStateToProps = (state) => {
  return {
    tokens: state.tokenList.tokens
  }
}

const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

class SendEthModal extends React.Component {
  constructor (props) {
    super(props)
    const jwt = cookie.get('X-ECW-ACCESS-TOKEN')
    this.state = {
      jwt: jwt,
      name: '',
      symbol: '',
      decimal: ''
    }
    console.log(props)
  }

  sendEth = () => {
    this.props.sendEth(this.state.jwt, {
      password: this.state.password,
      recipientAddress: this.state.recipientAddress,
      amount: this.state.amount,
    })
    this.props.handleCloseSendEthModal()
  }

  render () {
    return (
      <Modal isOpen={this.props.isSendEthModal} contentLabel='Modal'>
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
          <Button onClick={this.props.handleCloseSendEthModal} icon='x-circle' color='secondary'>Cancel</Button>
          <Button onClick={this.sendEth} icon='plus-circle' color='success'>Send ETH</Button>
        </Button.List>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(SendEthModal)
