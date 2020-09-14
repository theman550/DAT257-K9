import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path='/search'>
          <p>Search</p>
        </Route>
        <Route path='/add'>
          <p>Add trip</p>
        </Route>
        <Route path='/login'>
          <p>Login</p>
        </Route>
        <Route path='/'>
          <p>Home</p>
        </Route>
      </Switch>
    </Router>
  )
}

export default App