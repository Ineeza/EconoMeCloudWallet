import React from 'react'
import Router from 'react-router-dom'
import Link from 'next/link'
import logo from './images/Econome.png'

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

class MainPage extends React.Component {
  render(){
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
                <Nav.Item active value="Home" icon="globe" to='/login'></Nav.Item>
                <Nav.Item value="Login" icon="log-in" to='/login'></Nav.Item>
                <Nav.Item value="Register" icon="user-plus" to='/register'></Nav.Item>
              </React.Fragment>
            }
      />
      <Container>
        <Page>
          <Page.Header title="Dashboard"/>
          <Card>
            <Card.Header>
              <Card.Title>My wallet info</Card.Title>
              <Card.Options>
              </Card.Options>
            </Card.Header>
            <Card.Body>
              <Form.Group label="Network">
                <Form.Select>
                  <option>Rinkeby</option>
                  <option>Ropsten</option>
                  <option>Kovan</option>
                  <option>Mainnet</option>
                </Form.Select>
              </Form.Group>
              <Form.Group label="Ethereum Address">
                <Form.Input
                  name="eth-address"
                  readOnly
                  value="0xcb2c508ad5247df2ef60195fff8ae990adc16cbd"
                />
              </Form.Group>
              <Form.Group label="ETH Balance">
                <Form.Input
                  name="eth-balance"
                  readOnly
                  value="0.999718636 ETH"
                />
              </Form.Group>
              <Table hasOutline='true'>
                <Table.Header>
                  <Table.ColHeader>ERC20 Token Name</Table.ColHeader>
                  <Table.ColHeader>Balance</Table.ColHeader>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Col>Tronix (TRX)</Table.Col>
                    <Table.Col>1000</Table.Col>
                    <Table.Col alignContent='right'>
                      <Button.List>
                        <Button color='primary'>Send</Button>
                        <Button color='danger'>Remove</Button>
                      </Button.List>
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>BNB (BNB)</Table.Col>
                    <Table.Col>1000</Table.Col>
                    <Table.Col alignContent='right'>
                      <Button.List>
                        <Button color='primary'>Send</Button>
                        <Button color='danger'>Remove</Button>
                      </Button.List>
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>OmiseGO (OMG)</Table.Col>
                    <Table.Col>1000</Table.Col>
                    <Table.Col alignContent='right'>
                      <Button.List>
                        <Button color='primary'>Send</Button>
                        <Button color='danger'>Remove</Button>
                      </Button.List>
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>VeChain (VEN)</Table.Col>
                    <Table.Col>1000</Table.Col>
                    <Table.Col alignContent='right'>
                      <Button.List>
                        <Button color='primary'>Send</Button>
                        <Button color='danger'>Remove</Button>
                      </Button.List>
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>ZRX (ZRX)</Table.Col>
                    <Table.Col>1000</Table.Col>
                    <Table.Col alignContent='right'>
                      <Button.List>
                        <Button color='primary'>Send</Button>
                        <Button color='danger'>Remove</Button>
                      </Button.List>
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>Maker (MKR)</Table.Col>
                    <Table.Col>1000</Table.Col>
                    <Table.Col alignContent='right'>
                      <Button.List>
                        <Button color='primary'>Send</Button>
                        <Button color='danger'>Remove</Button>
                      </Button.List>
                    </Table.Col>
                  </Table.Row>
                </Table.Body>
              </Table>
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

export default MainPage
