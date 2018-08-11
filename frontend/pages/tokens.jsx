import React, { Component } from 'react'

export default class extends Component {
  static getInitialProps ({ query: { id } }) {
    return { postId: id }
  }

  render () {
    return <div>
      <h1>My tokens #{this.props.postId}</h1>
      <p>
        About my tokens...
      </p>
    </div>
  }
}
