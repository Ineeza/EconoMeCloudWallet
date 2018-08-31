import React from 'react'
import Router from 'react-router-dom'
import Link from 'next/link'
import logo from './images/econome-logo.png'
import Modal from 'react-modal'
import AddTokenModal from '../components/add-token-modal/'
import SendTokenModal from '../components/send-token-modal/'

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
} from 'tabler-react'

class MainPage extends React.Component {
  constructor () {
    super()
    this.state = {
      isAddTokenModal: false,
      isSendTokenModal: false,
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
        { value: "Home", to: "/", icon: "home" },
        { value: "Tokens", to: "/tokens", icon: "database" }
      ]
    }

    // Send-Token Modal
    this.handleOpenSendTokenModal = this.handleOpenSendTokenModal.bind(this)
    this.handleCloseSendTokenModal = this.handleCloseSendTokenModal.bind(this)

    // Add-Token Modal
    this.handleOpenAddTokenModal = this.handleOpenAddTokenModal.bind(this)
    this.handleCloseAddTokenModal = this.handleCloseAddTokenModal.bind(this)
  }

  handleOpenSendTokenModal () {
    this.setState({ isSendTokenModal: true })
  }

  handleCloseSendTokenModal () {
    this.setState({ isSendTokenModal: false })
  }

  handleOpenAddTokenModal () {
    this.setState({ isAddTokenModal: true })
  }

  handleCloseAddTokenModal () {
    this.setState({ isAddTokenModal: false })
  }

  render(){
    const { open } = this.state
    const titleStyle = {
      fontSize: '30px'
    }

    return (
      <div>
        <Site.Wrapper
          headerProps={{alt: 'EconoMe', imageURL: logo}}
          navProps={{itemsObjects: this.state.navBarItems}}
          footerProps={{copyright: 'Copyright © 2018 Ineeza, Inc.'}}
        >
          <Page.Content>
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
                    {this.state.data.map(p =>{
                       return(
                         <Table.Row key={p.id}>
                           <Table.Col>{ p.tokenName }</Table.Col>
                           <Table.Col>{ p.balance }</Table.Col>
                           <Table.Col alignContent='right'>
                             <Button.List>
                               <Button onClick={this.handleOpenSendTokenModal} color='primary'>Send</Button>
                               <SendTokenModal
                                 isSendTokenModal={this.state.isSendTokenModal}
                                 handleCloseSendTokenModal={this.handleCloseSendTokenModal}/>
                             </Button.List>
                           </Table.Col>
                         </Table.Row>
                       )
                    })}
                  </Table.Body>
                </Table>
                <Button.List>
                  <Button onClick={this.handleOpenAddTokenModal} block icon='plus-circle' color='success' outline>
                    Add new token
                  </Button>
                  <AddTokenModal
                    isAddTokenModal={this.state.isAddTokenModal}
                    handleCloseAddTokenModal={this.handleCloseAddTokenModal}/>
                </Button.List>
              </Card.Body>
            </Card>
          </Page.Content>
        </Site.Wrapper>
      </div>
    )
  }
}

export default MainPage
