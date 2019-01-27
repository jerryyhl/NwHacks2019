import React, { Component } from 'react';

const request = require('request');


class LockComponent extends Component {
    state = {
        passwordIncorrect: false,
        password: ""
    };

    validatePassword = () => {
        // this.props.validate();
        console.log(this.state.password);
        request('http://localhost:5000/unlock/' + this.state.password, (error, response, body) => {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            if (body === "SUCCESS") {
                this.props.handleCorrectPassword()
            } else {
                this.setState({passwordIncorrect: true})
            }
        });
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value, passwordIncorrect: false})
    };

    render() {
        return (
            <div>
                <form>
                    <div className={"form-group"}>
                        <input type="password" className="form-control" onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password"/>
                    </div>
                    <div className={"invalid-feedback " + (this.state.passwordIncorrect ? "d-none" : "")}>
                        Sorry, that password is not correct. Please try again.
                    </div>
                </form>
                <button type="button" onClick={this.validatePassword} className="btn btn-primary">Submit</button>
            </div>
        );
    }
}

export class LockScreen extends Component {
    render() {
        return (
            <div>
                Please unlock the password manager.
                <br/><br/>
                <LockComponent/>
            </div>
        );
    }
}