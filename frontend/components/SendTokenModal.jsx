import React from 'react'
import Modal from 'react-modal'
import { Form, Button } from 'tabler-react'

export default class SendTokenModal extends React.Component {
  render () {
    return (
      <Modal isOpen={this.props.isSendTokenModal} contentLabel='Modal'>
        <Form.FieldSet>
          <Form.Group label='Recipient Address' isRequired>
            <Form.Input name='recipient-address' />
          </Form.Group>
          <Form.Group label='Amount' isRequired>
            <Form.Input name='amount' />
          </Form.Group>
          <Form.Group label='Password' isRequired>
            <Form.Input name='password' />
          </Form.Group>
        </Form.FieldSet>
        <Button.List align='center'>
          <Button onClick={this.props.handleCloseSendTokenModal} icon='x-circle' color='secondary'>Cancel</Button>
          <Button onClick={this.props.handleCloseSendTokenModal} icon='plus-circle' color='success'>Send a token</Button>
        </Button.List>
      </Modal>
    )
  }
}
