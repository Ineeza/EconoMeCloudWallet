import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { connect } from 'react-redux'
import actions from '../../redux/actions'
import logo from '../../static/econome-logo.png'
import { Page, Site } from 'tabler-react'

// { children, title, isAuthenticated, deauthenticate }
class BaseLayout extends React.Component {
  constructor (props) {
    super()
    this.state = {
      navBarItems: [
        { value: 'Home', to: '/', icon: 'home' },
        { value: 'Wallet', to: '/dashboard', icon: 'credit-card' },
        { value: 'Tokens', to: '/tokens', icon: 'database' },
        { value: 'Profile', to: '/whoami', icon: 'flag' },
        { value: 'Login', to: '/login', icon: 'log-in' },
        { value: 'Signup', to: '/signup', icon: 'user-plus' }
      ]
    }
    const mapStateToProps = (state) => (
      { isAuthenticated: !!state.authentication.token }
    )
  }
  render () {
    return (
      <div>
        <Site.Wrapper
          headerProps={{ alt: 'EconoMe', imageURL: logo }}
          navProps={{ itemsObjects: this.state.navBarItems }}
          footerProps={{ copyright: 'Copyright © 2018 Ineeza, Inc.' }}
        >
          <Page.Content>
          </Page.Content>
        </Site.Wrapper>
      </div>
    )
  }
}

export default connect(this.mapStateToProps, actions)(BaseLayout)
