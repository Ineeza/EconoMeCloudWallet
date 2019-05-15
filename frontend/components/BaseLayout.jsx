import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import logo from '../static/econome-logo.png'
import { Page, Site } from 'tabler-react'
import PropTypes from 'prop-types'
import 'tabler-react/dist/Tabler.css'
import { initGA, logPageView } from '../utils/analytics'

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token
})

class BaseLayout extends React.Component {
  constructor (props) {
    super()
    let navBarItems = {}
    if (!props.isAuthenticated) {
      navBarItems = {
        navBarItems: [
          { value: 'Home', to: '/', icon: 'home' },
          { value: 'Login', to: '/login', icon: 'log-in' },
          { value: 'Signup', to: '/signup', icon: 'user-plus' }
        ]
      }
    } else {
      navBarItems = {
        navBarItems: [
          { value: 'Home', to: '/', icon: 'home' },
          { value: 'Wallet', to: '/dashboard', icon: 'credit-card' },
          { value: 'Tokens', to: '/tokens', icon: 'database' },
          { value: 'Profile', to: '/whoami', icon: 'flag' },
          { value: 'Mnemonic', to: '/mnemonic', icon: 'edit' },
          { value: 'Logout', to: '/logout', icon: 'log-out' }
        ]
      }
    }
    this.state = navBarItems
  }

  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render () {
    return (
      <div>
        <Site.Wrapper
          headerProps={{ alt: 'EconoMe', imageURL: logo }}
          navProps={{ itemsObjects: this.state.navBarItems }}
          footerProps={{ copyright: 'Copyright © 2019 Ineeza, Inc.' }}
        >
          <Page.Content>
            <div>
              { this.props.children }
            </div>
          </Page.Content>
        </Site.Wrapper>
      </div>
    )
  }
}

BaseLayout.propTypes = {
  children: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, actions)(BaseLayout)
