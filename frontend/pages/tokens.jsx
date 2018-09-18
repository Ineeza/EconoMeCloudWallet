import React from 'react'
import { connect } from 'react-redux'
import initialize from '../utils/initialize'
import BaseLayout from '../components/baselayout/'
import AddTokenModal from '../components/add-token-modal/'

import {
  Page,
  Button,
  Card,
  Container,
  Table
} from 'tabler-react'

class TokenListPage extends React.Component {
  static getInitialProps (ctx) {
    initialize(ctx)
  }

  constructor () {
    super()
    this.state = {
      isAddTokenModal: false,
      data: [{
        id: 1,
        tokenName: 'Tronix',
        symbol: 'TRX',
        decimal: 18,
        balance: 1000
      }, {
        id: 2,
        tokenName: 'BNB',
        symbol: 'BNB',
        decimal: 18,
        balance: 300
      }, {
        id: 3,
        tokenName: 'OmiseGO',
        symbol: 'OMG',
        decimal: 18,
        balance: 500
      }, {
        id: 4,
        tokenName: 'VeChain',
        symbol: 'VEN',
        decimal: 18,
        balance: 7000
      }, {
        id: 5,
        tokenName: 'ZRX',
        symbol: 'ZRX',
        decimal: 18,
        balance: 1200
      }, {
        id: 6,
        tokenName: 'Maker',
        symbol: 'MKR',
        decimal: 18,
        balance: 15000
      }],
      navBarItems: [
        { value: 'Home', to: '/', icon: 'home' },
        { value: 'Tokens', to: '/tokens', icon: 'database' }
      ]
    }

    // Add-Token Modal
    this.handleOpenAddTokenModal = this.handleOpenAddTokenModal.bind(this)
    this.handleCloseAddTokenModal = this.handleCloseAddTokenModal.bind(this)
  }

  handleOpenAddTokenModal () {
    this.setState({ isAddTokenModal: true })
  }

  handleCloseAddTokenModal () {
    this.setState({ isAddTokenModal: false })
  }

  render () {
    return (
      <div>
        <BaseLayout>
          <Container>
            <Page>
              <Card>
                <Card.Body>
                  <Table hasOutline='true'>
                    <Table.Header>
                      <Table.ColHeader>Name</Table.ColHeader>
                      <Table.ColHeader>Balance</Table.ColHeader>
                    </Table.Header>
                    <Table.Body>
                      {this.state.data.map(p => {
                        return (
                          <Table.Row key={p.id}>
                            <Table.Col>{ p.tokenName }</Table.Col>
                            <Table.Col>{ p.balance }</Table.Col>
                            <Table.Col alignContent='right'>
                              <Button.List>
                                <Button onClick={this.handleOpenSendTokenModal} color='danger'>Remove</Button>
                              </Button.List>
                            </Table.Col>
                          </Table.Row>
                        )
                      })}
                    </Table.Body>
                  </Table>
                  <Button.List>
                    <Button.List align='center'>
                      <Button onClick={this.handleOpenAddTokenModal} block icon='plus-circle' color='success' outline>
                        Add new token
                      </Button>
                      <AddTokenModal
                        isAddTokenModal={this.state.isAddTokenModal}
                        handleCloseAddTokenModal={this.handleCloseAddTokenModal} />
                    </Button.List>
                  </Button.List>
                </Card.Body>
              </Card>
            </Page>
          </Container>
        </BaseLayout>
      </div>
    )
  }
}

export default connect()(TokenListPage)
