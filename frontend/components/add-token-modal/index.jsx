import React from 'react'
import Modal from 'react-modal'
import { Form, Button } from 'tabler-react'

export default class AddTokenModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isAddTokenModal} contentLabel='Modal'>
        <Form.FieldSet>
          <Form.Group label="Contract Address" isRequired>
            <Form.Input name="contract-address" />
          </Form.Group>
          <Form.Group label="Token Name" isRequired>
            <Form.Input name="token-name" />
          </Form.Group>
          <Form.Group label="Symbol" isRequired>
            <Form.Input name="symbol" />
          </Form.Group>
          <Form.Group label="Decimal" isRequired>
            <Form.Input name="decimal" />
          </Form.Group>
        </Form.FieldSet>
        <Button.List align='center'>
          <Button onClick={this.props.handleCloseAddTokenModal} icon='x-circle' color='secondary'>Cancel</Button>
          <Button onClick={this.props.handleCloseAddTokenModal} icon='plus-circle' color='success'>Add a token</Button>
        </Button.List>
      </Modal>
    )
  }
}
