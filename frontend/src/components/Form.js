import React, { Component } from 'react'
//import App from '../App'
import '../style/Form.css'

class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            Email: "",
            password: "",
            confirmPassword:""
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    firsthandler = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    lasthandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    userhandler = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    Emailhandler = (event) => {
        this.setState({
            Email: event.target.value
        })
    }

    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    confirmhandler = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.firstName} ${this.state.lastName}  ${this.state.userName}  ${this.state.Email}  ${this.state.password}  ${this.state.confirmPassword} `)
        console.log(this.state);
        this.setState({
            firstName: "",
            lastName: "",
            Email: "",
			userName: "",
            password: "",
            confirmPassword: "",
        })
     event.preventDefault()
        
    }


    render() {
        return (<div className="reg">
            <div>

                <form onSubmit={this.handleSubmit}>
                    <h1>UserAccount</h1>
                    <table class="center">
                        <tr>
                            <td><label>First name</label></td>
                            <td><input type="text" value={this.state.firstName} onChange={this.firsthandler} placeholder="FirstName" /></td>
                        </tr>
                        <tr>
                            <td><label>Last name</label></td>
                            <td><input type="text" value={this.state.lastName} onChange={this.lasthandler} placeholder="LastName" /></td>
                        </tr>
                        <tr>
                            <td><label>Email</label></td>
                            <td><input type="text" value={this.state.Email} onChange={this.Emailhandler} placeholder="Email" /></td>
                        </tr>
                        <tr>
                            <td><label>Username</label></td>
                            <td><input type="text" value={this.state.userName} onChange={this.userhandler} placeholder="UserName" /></td>
                        </tr>
                        <tr>
                            <td><label>Password</label></td>
                            <td><input type="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Password" /></td>
                        </tr>
                        <tr>
                            <td><label>Confirm password</label></td>
                            <td><input type="password" value={this.state.confirmPassword} onChange={this.confirmhandler} placeholder="Password" /></td>
                        </tr>
                        <tr>
                    <td><label></label></td>
                        <td><input type="submit" value="Submit" /></td>
                    </tr>
                    </table>
                </form>
            </div>
            </div>
        )
    }
}

export default Form