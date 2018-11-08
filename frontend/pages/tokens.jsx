// @flow
import React from 'react'
import { connect } from 'react-redux'
import axiosBase from 'axios'
import { bindActionCreators } from 'redux'
import { getCookieFromBrowser } from '../utils/cookie'
import actions from '../actions'
import { apiHost } from '../../backend/config'
import initialize from '../utils/initialize'
import BaseLayout from '../components/BaseLayout'
import AddTokenModal from '../components/AddTokenModal'
// $FlowFixMe
import { Page, Button, Card, Container, Table } from 'tabler-react'

type Props = {
  tokens: Array<Object>
}

type State = {
  isAddTokenModal: boolean,
  navBarItems: Array<Object>
}

const mapStateToProps = (state) => {
  return {
    tokens: state.tokenList.tokens
  }
}

const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

class TokenListPage extends React.Component<Props, State> {
  static async getInitialProps (ctx) {
    initialize(ctx)
    const jwt = ctx.store.getState().authentication.token
    const axios = axiosBase.create({
      baseURL: apiHost,
      headers: {
        'X-ECW-ACCESS-TOKEN': jwt
      }
    })
    if (jwt) {
      const response = await axios.get(`/api/token`)
      const tokenList = response.data.tokens
      return {
        tokenList,
        jwt
      }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      isAddTokenModal: false,
      navBarItems: [
        { value: 'Home', to: '/', icon: 'home' },
        { value: 'Tokens', to: '/tokens', icon: 'database' }
      ]
    }
    this.props.getTokenList(props.jwt)
  }

  handleOpenAddTokenModal = () => {
    this.setState({ isAddTokenModal: true })
  }

  handleCloseAddTokenModal = () => {
    this.setState({ isAddTokenModal: false })
  }

  addToken = () => {
    this.props.addToken()
  }

  removeToken = () => {
    this.props.removeToken()
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
                      {
                        this.props.tokens.map(p => {
                          return (
                            <Table.Row key={p.id}>
                              <Table.Col>{ p.name }</Table.Col>
                              <Table.Col>{ p.symbol }</Table.Col>
                              <Table.Col>{ p.decimal }</Table.Col>
                              <Table.Col>{ p.contract_address }</Table.Col>
                              <Table.Col alignContent='right'>
                                <Button.List>
                                  <Button onClick={this.removeToken} color='danger'>Remove</Button>
                                </Button.List>
                              </Table.Col>
                            </Table.Row>
                          )
                        })}
                    </Table.Body>
                  </Table>
                  <Button.List>
                    <Button.List align='center'>
                      <Button onClick={this.addToken} block icon='plus-circle' color='success' outline>
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

export default connect(mapStateToProps, mapDispachToProps)(TokenListPage)
