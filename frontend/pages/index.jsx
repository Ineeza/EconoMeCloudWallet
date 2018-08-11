import React from 'react'
import Link from 'next/link'

import { Card, Button } from 'tabler-react'

export default () => (
  <div>
    <ul>
      <li><Link href='/login' as='/login'><a>Login</a></Link></li>
      <li><Link href='/dashboard' as='/dashboard'><a>Dashboard</a></Link></li>
      <li>
        <Link
          href={{pathname: '/tokens', query: { id: '2' }}}
          as='/tokens/2'
        >
          <a>tokens #2</a>
        </Link>
      </li>
    </ul>
    <Card>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button color="primary">A Button</Button>
      </Card.Body>
    </Card>
  </div>
)
