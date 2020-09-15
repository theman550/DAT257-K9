import React from 'react'
import {Component} from 'react'
import Search from './components/Search'
import Login from './components/login'
import {
   BrowserRouter as Router,
   Switch,
   Route
 } from 'react-router-dom'
 import Navigation from './components/Navigation'

 class App extends Component {
    
render(){
   return (
     
      <Router>
        <Navigation />
        <Switch>
          <Route path='/search'>
            <p>Search</p>
          </Route>
          <Route path='/add'>
            <p>Add trip</p>
            <Search/>
          </Route>
          <Route path='/login'>
            <p>Login</p>
            <Login/>
          </Route>
          <Route path='/'>
            <p>Home</p>
          </Route>
        </Switch>
      </Router>
    )
 }

}
export default App
