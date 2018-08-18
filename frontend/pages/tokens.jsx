import React from 'react'
import Router from 'react-router-dom'
import Link from 'next/link'
import logo from './images/Econome.png'
import Modal from 'react-modal'

import {
  Page,
  Site,
  Button,
  Nav,
  Dropdown,
  Avatar,
  Grid,
  Text,
  Icon,
  Card,
  Profile,
  Container,
  Table,
  Form,
} from "tabler-react"


class TokenListPage extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false
    }

    Modal.setAppElement('body');

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render(){
    const { open } = this.state

    const titleStyle = {
      fontSize: '30px'
    }
    return (
      <div>
        <Site>
          <Site.Header><div style={titleStyle}>EconoMe Cloud Wallet</div></Site.Header>
          <Site.Nav
            items={
              <React.Fragment>
                <Nav.Item value='Home' icon='home' to='/'></Nav.Item>
                <Nav.Item active value='Tokens' icon='database' to='/tokens'></Nav.Item>
                <Nav.Item value='Login' icon='log-in' to='/login'></Nav.Item>
                <Nav.Item value='Register' icon='user-plus' to='/register'></Nav.Item>
              </React.Fragment>
            }
          />
          <Container>
            <Page>
              <Page.Header title='ERC20 Tokens List'/>
              <Card>
                <Card.Body>
                  <Table hasOutline='true'>
                    <Table.Header>
                      <Table.ColHeader>Name</Table.ColHeader>
                      <Table.ColHeader>Symbol</Table.ColHeader>
                      <Table.ColHeader>Decimal</Table.ColHeader>
                      <Table.ColHeader>Balance</Table.ColHeader>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Col>Tronix</Table.Col>
                        <Table.Col>TRX</Table.Col>
                        <Table.Col>18</Table.Col>
                        <Table.Col>1000</Table.Col>
                        <Table.Col alignContent='right'>
                          <Button.List>
                            <Button color='success'>Edit</Button>
                            <Button color='danger'>Remove</Button>
                          </Button.List>
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>BNB</Table.Col>
                        <Table.Col>BNB</Table.Col>
                        <Table.Col>18</Table.Col>
                        <Table.Col>1000</Table.Col>
                        <Table.Col alignContent='right'>
                          <Button.List>
                            <Button color='success'>Edit</Button>
                            <Button color='danger'>Remove</Button>
                          </Button.List>
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>OmiseGO</Table.Col>
                        <Table.Col>OMG</Table.Col>
                        <Table.Col>18</Table.Col>
                        <Table.Col>1000</Table.Col>
                        <Table.Col alignContent='right'>
                          <Button.List>
                            <Button color='success'>Edit</Button>
                            <Button color='danger'>Remove</Button>
                          </Button.List>
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>VeChain</Table.Col>
                        <Table.Col>VEN</Table.Col>
                        <Table.Col>18</Table.Col>
                        <Table.Col>1000</Table.Col>
                        <Table.Col alignContent='right'>
                          <Button.List>
                            <Button color='success'>Edit</Button>
                            <Button color='danger'>Remove</Button>
                          </Button.List>
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>ZRX</Table.Col>
                        <Table.Col>ZRX</Table.Col>
                        <Table.Col>18</Table.Col>
                        <Table.Col>1000</Table.Col>
                        <Table.Col alignContent='right'>
                          <Button.List>
                            <Button color='success'>Edit</Button>
                            <Button color='danger'>Remove</Button>
                          </Button.List>
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>Maker</Table.Col>
                        <Table.Col>MKR</Table.Col>
                        <Table.Col>18</Table.Col>
                        <Table.Col>1000</Table.Col>
                        <Table.Col alignContent='right'>
                          <Button.List>
                            <Button color='success'>Edit</Button>
                            <Button color='danger'>Remove</Button>
                          </Button.List>
                        </Table.Col>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Button.List>
                    <Button onClick={this.handleOpenModal} block icon='plus-circle' color='success' outline>
                      Add new token
                    </Button>
                    <Modal isOpen={this.state.showModal} contentLabel='Modal'>
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
                        <Button onClick={this.handleCloseModal} icon='x-circle' color='secondary'>Cancel</Button>
                        <Button onClick={this.handleCloseModal} icon='plus-circle' color='success'>Add a token</Button>
                      </Button.List>
                    </Modal>
                  </Button.List>
                </Card.Body>
              </Card>
            </Page>
          </Container>
          <Site.Footer copyright='Copyright © 2018 Ineeza, Inc.'></Site.Footer>
        </Site>
      </div>
    )
  }
}

const props = {}

export default TokenListPage
