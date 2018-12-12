// @flow
import React from 'react'
import Modal from 'react-modal'
// $FlowFixMe
import { Form, Button } from 'tabler-react'
import { bindActionCreators } from 'redux'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import actions from '../actions'
import { JWT_KEY } from '../constants/keys'

type Props = {
  isAddTokenModal: boolean,
  addToken: Function,
  handleCloseAddTokenModal: Function
}

type State = {
  jwt: Object,
  contractAddress: string,
  name: string,
  symbol: string,
  decimal: string
}

const mapStateToProps = (state) => {
  return {
    tokens: state.tokenList.tokens
  }
}

const mapDispachToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators(actions, dispatch)
}

class AddTokenModal extends React.Component<Props, State> {
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

  addToken = () => {
    this.props.addToken(this.state.jwt, {
      contractAddress: this.state.contractAddress,
      name: this.state.name,
      symbol: this.state.symbol,
      decimal: this.state.decimal
    })
    this.props.handleCloseAddTokenModal()
  }

  render () {
    return (
      <Modal isOpen={this.props.isAddTokenModal} contentLabel='Modal'>
        <Form.FieldSet>
          <Form.Group label='Contract Address' isRequired>
            <Form.Input
              name='contract-address'
              placeholder=''
              value={this.state.contractAddress}
              onChange={(e) => this.setState({ contractAddress: e.target.value })}
            />
          </Form.Group>
          <Form.Group label='Token Name' isRequired>
            <Form.Input
              name='token-name'
              placeholder=''
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </Form.Group>
          <Form.Group label='Symbol' isRequired>
            <Form.Input
              name='symbol'
              placeholder=''
              value={this.state.symbol}
              onChange={(e) => this.setState({ symbol: e.target.value })}
            />
          </Form.Group>
          <Form.Group label='Decimal' isRequired>
            <Form.Input
              name='decimal'
              placeholder=''
              value={this.state.decimal}
              onChange={(e) => this.setState({ decimal: e.target.value })}
            />
          </Form.Group>
        </Form.FieldSet>
        <Button.List align='center'>
          <Button onClick={this.props.handleCloseAddTokenModal} icon='x-circle' color='secondary'>Cancel</Button>
          <Button onClick={this.addToken} icon='plus-circle' color='success'>Add a token</Button>
        </Button.List>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(AddTokenModal)
