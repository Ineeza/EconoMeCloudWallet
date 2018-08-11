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
} from "tabler-react"

const navBarItems = [
  { value: "Home", to: "/", icon: "home" },
  { value: "Home2", to: "/", icon: "home" },
  { value: "Home3", to: "/", icon: "home" },
  { value: "Home4", to: "/", icon: "home" }
]

class MainPage extends React.Component {
   render() {
     return (
       <div>
         <Page>
           <Page.Main>
             <Site.Header>
               <Site.Logo
                 href='/'
                 alt='EconoMe'
                 src={logo}
               />
             </Site.Header>
             <Nav
               items={
                 <React.Fragment>
                   <Nav.Item active value="Home" icon="globe" to='/login'></Nav.Item>
                   <Nav.Item value="Home" icon="globe" to='/login'></Nav.Item>
                   <Nav.Item value="Home" icon="globe" to='/login'></Nav.Item>
                 </React.Fragment>
               }
             />
           </Page.Main>
         </Page>
       </div>
     )
   }
 }

export default MainPage
