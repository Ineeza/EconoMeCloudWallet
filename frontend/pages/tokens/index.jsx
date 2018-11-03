// @flow
import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { apiHost } from '../../../backend/config'
import initialize from '../../utils/initialize'
import BaseLayout from '../../components/BaseLayout'
import AddTokenModal from '../../components/AddTokenModal'

// $FlowFixMe
import { Page, Button, Card, Container, Table } from 'tabler-react'

type Props = {
  tokens: Array<Object>
}

type State = {
  isAddTokenModal: boolean,
  navBarItems: Array<Object>
}

class TokenListPage extends React.Component<Props, State> {
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
      const response = await axios.get(`/api/token`)
      const tokens = response.data.tokens
      return {
        tokens
      }
    }
  }

  constructor () {
    super()
    this.state = {
      isAddTokenModal: false,
      data: [],
      navBarItems: [
        { value: 'Home', to: '/', icon: 'home' },
        { value: 'Tokens', to: '/tokens', icon: 'database' }
      ]
    }
  }

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
          <Container>
            <Page>
              <Card>
                <Card.Body>
                  <Table hasOutline='true' responsive='true'>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColHeader>Name</Table.ColHeader>
                        <Table.ColHeader>Symbol</Table.ColHeader>
                        <Table.ColHeader>Decimal</Table.ColHeader>
                        <Table.ColHeader>Address</Table.ColHeader>
                        <Table.ColHeader>Action</Table.ColHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.props.tokens.map(p => {
                        return (
                          <Table.Row key={p.id}>
                            <Table.Col>{ p.name }</Table.Col>
                            <Table.Col>{ p.symbol }</Table.Col>
                            <Table.Col>{ p.decimal }</Table.Col>
                            <Table.Col>{ p.contract_address }</Table.Col>
                            <Table.Col alignContent='right'>
                              <Button.List>
                                <Button onClick={this.handleOpenAddTokenModal} color='danger'>Remove</Button>
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
