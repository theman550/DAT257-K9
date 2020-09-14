import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <h2>Share-a-ride</h2>
      <ul>
        <li>
          <Link to='/search'>
            Search
          </Link>
        </li>
        <li>
          <Link to='/add'>
            Add trip
          </Link>
        </li>
        <li>
          <Link to='/login'>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation