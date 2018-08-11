import React from 'react'
import Link from 'next/link'

export default () => (
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
)

