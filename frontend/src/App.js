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
          <p>Search page</p>
        </Route>
        <Route path='/add'>
          <p>Add trip page</p>
        </Route>
        <Route path='/login'>
          <p>Login page</p>
        </Route>
        <Route path='/'>
          <p>Home page</p>
        </Route>
      </Switch>
    </Router>
  )
}

export default App