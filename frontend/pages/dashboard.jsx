import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { apiHost } from '../../backend/config'
import initialize from '../utils/initialize'
import BaseLayout from '../components/BaseLayout'
import SendTokenModal from '../components/SendTokenModal'
import {
  Page,
  Button,
  Card,
  Table,
  Form
} from 'tabler-react'

class MainPage extends React.Component {
  static async getInitialProps (ctx) {
    initialize(ctx)
    const token = ctx.store.getState().authentication.token
    const axios = axiosBase.create({
      baseURL: apiHost,
      headers: {
        'X-ECW-ACCESS-TOKEN': token
      }
    })
    if (token) {
      const response = await axios.get(`/api/balance`)
      const wallet = response.data
      return {
        wallet
      }
    }
  }

  constructor () {
    super()
    this.state = {
      isAddTokenModal: false,
      isSendTokenModal: false,
      data: []
    }
  }

  // Send-Token Modal
  handleOpenSendTokenModal = () => {
    this.setState({ isSendTokenModal: true })
  }

  handleCloseSendTokenModal = () => {
    this.setState({ isSendTokenModal: false })
  }

  // Add-Token Modal
  handleOpenAddTokenModal = () => {
    this.setState({ isAddTokenModal: true })
  }

  handleCloseAddTokenModal = () => {
    this.setState({ isAddTokenModal: false })
  }

  render () {
    return (
      <div>
        <BaseLayout>
          <Page.Content>
            <Card>
              <Card.Header>
                <Card.Title>My wallet info</Card.Title>
                <Card.Options>
                </Card.Options>
              </Card.Header>
              <Card.Body>
                <Form.Group label='Network'>
                  <Form.Select>
                    <option>Rinkeby</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group label='Ethereum Address'>
                  <Form.Input
                    name='eth-address'
                    readOnly
                    value={this.props.wallet.myWalletAddress}
                  />
                </Form.Group>
                <Form.Group label='ETH Balance'>
                  <Form.Input
                    name='eth-balance'
                    readOnly
                    value={this.props.wallet.ethBalance}
                  />
                </Form.Group>
                <Button.List>
                  <Button onClick={this.handleOpenSendTokenModal} block color='primary'>Send ETH</Button>
                  <SendTokenModal
                    isSendTokenModal={this.state.isSendTokenModal}
                    handleCloseSendTokenModal={this.handleCloseSendTokenModal} />
                </Button.List>
                <hr />
                <Table hasOutline='true' responsive='true'>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColHeader>ERC20 Token Name</Table.ColHeader>
                      <Table.ColHeader>Balance</Table.ColHeader>
                      <Table.ColHeader></Table.ColHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.wallet.tokens.map(p => {
                      return (
                        <Table.Row key={p.info.id}>
                          <Table.Col>{p.info.name}</Table.Col>
                          <Table.Col>{p.balance}</Table.Col>
                          <Table.Col alignContent='right'>
                            <Button.List>
                              <Button onClick={this.handleOpenSendTokenModal} color='primary'>Send</Button>
                              <SendTokenModal
                                isSendTokenModal={this.state.isSendTokenModal}
                                handleCloseSendTokenModal={this.handleCloseSendTokenModal} />
                            </Button.List>
                          </Table.Col>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              </Card.Body>
            </Card>
          </Page.Content>
        </BaseLayout>
      </div>
    )
  }
}

export default connect()(MainPage)
