import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Addtrip from './components/Addtrip';
import Login from './components/Login';
import Form from './components/Form';
import Navigation from './components/Navigation';
class App extends Component {
    render() {
        return (

            <Router>
                <Navigation />
                <Switch>
                    <Route path="/reg">
                        <p>Register Page</p>
                        <Form />
                    </Route>
                    <Route path="/search">
                        <p> Search Page </p>
                    </Route>
                    <Route path="/add">
                        <p> Add trip page </p>
                        <Addtrip />
                    </Route>
                    <Route path="/login">
                        <p>Login page </p>
                        <Login />
                    </Route>
                    <Route path="/">
                        <p>Home Page </p>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default App;
