import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { connect } from 'react-redux'
import actions from '../../redux/actions'
import logo from '../../static/econome-logo.png'
import { Page, Site } from 'tabler-react'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => (
  { isAuthenticated: !!state.authentication.token }
)

class BaseLayout extends React.Component {
  constructor (props) {
    super()
    // <Link href='/'><a>Home</a></Link>
    // {!isAuthenticated && <Link href='/login'><a>Sign In</a></Link>}
    // {!isAuthenticated && <Link href='/signup'><a>Sign Up</a></Link>}
    // {isAuthenticated && <li onClick={deauthenticate}><a>Sign Out</a></li>}
    // <Link href='/whoami'><a>Who Am I</a></Link>

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
          { value: 'Logout', to: '/logout', icon: 'log-out' }
        ]
      }
    }

   // console.log('===== TEST =====')
   // console.log(props)
   // console.log(navBarItems)

    this.state = navBarItems
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
            <div className='has-text-centered'>
              { this.props.children }
            </div>
          </Page.Content>
        </Site.Wrapper>
      </div>
    )
  }
}

// { isAuthenticated, deauthenticate }
BaseLayout.propTypes = {
  children: PropTypes.array,
  isAuthenticated: PropTypes.bool,
  deauthenticate: PropTypes.func
}

export default connect(mapStateToProps, actions)(BaseLayout)
