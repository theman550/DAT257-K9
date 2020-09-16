import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Addtrip from './components/Addtrip';
import Navigation from './components/Navigation';

class App extends Component {

   
    render() {
        return (
            <Router>
                <Navigation />
                <Switch>
                    <Route path="/reg">
                        <p>Register page</p>
                    </Route>
                    <Route path="/search">
                        <p> Search page </p>
                    </Route>
                    <Route path="/add">
                        <p> Add trip page </p>
                        <Addtrip />
                    </Route>
                    <Route path="/login">
                        <p>Login page </p>
                    </Route>
                    <Route path="/">
                        <p>Home page </p>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default App;
