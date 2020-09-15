import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <h2>Share-a-ride</h2>
      <ul>
        <li>
          <Link to='/search'>
            Search12
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