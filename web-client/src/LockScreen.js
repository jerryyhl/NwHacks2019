import React, { Component } from 'react';

class LockComponent extends Component {
    state = {
        passwordIncorrect: false,
        password: ""
    };

    validatePassword = () => {
        // this.props.validate();
        console.log(this.state.password);
        this.setState({passwordIncorrect: true})
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value, passwordIncorrect: false})
    };

    render() {
        return (
            <div>
                <form>
                    <div className={"form-group " + this.state.passwordIncorrect ? "was-validated" : ""}>
                        <input type="password" className="form-control" onChange={this.handlePasswordChange} value={this.state.password} aria-describedby="emailHelp" placeholder="Password"/>
                    </div>
                </form>
                <button type="submit" onClick={this.validatePassword} className="btn btn-primary">Submit</button>
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