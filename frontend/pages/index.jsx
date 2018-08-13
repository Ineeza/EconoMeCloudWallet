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
} from "tabler-react"

class MainPage extends React.Component {
  render(){
    const titleStyle = {
      fontSize: '30px'
    }
    return (
      <div>
        <Site>
          <Site.Header><div style={titleStyle}>EconoMe</div></Site.Header>
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
              <Card
                title="Wallet Info"
                body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
    deleniti fugit incidunt, iste, itaque minima neque pariatur
    perferendis sed suscipit velit vitae voluptatem. A consequuntur,
    deserunt eaque error nulla temporibus!`}
              />
            </Page>
          </Container>
          <Site.Footer copyright='Ineeza, Inc.'></Site.Footer>
        </Site>
      </div>
    )
  }
 }

export default MainPage
