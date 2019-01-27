import React, { Component } from 'react';
import {SelectionBox} from './SelectionBox';
import {LockScreen} from './LockScreen';
import './App.css';

const request = require('request');

class SendingPassword extends Component {
    render() {
        return (
            <div>
                <div>
                    {
                        this.props.sendingCompleted ?
                            <div>
                                Sending Password For {this.props.label}...
                            </div>
                            :
                            <div>
                                Sent Password for {this.props.label}!
                            </div>
                    }
                </div>
            </div>
        );
    }
}

class NewLabelInput extends Component {
    render() {
        return (
            <div>
                Please enter a label for the password that will be generated.
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" aria-describedby="A label fof your password" placeholder="Label"/>
                    </div>
                    <button type="button" className="btn btn-primary">Generate Password For Label</button>
                </form>
            </div>
        );
    }
}

class PasswordSelection extends Component {
    render() {
        return (
            <div>
                <SelectionBox labels={this.props.labels} value={this.props.labelSelected} onChange={this.props.onChange}/>
                <div>
                    <form>
                        {
                            this.props.labelSelected ? <button type="button" className="btn btn-primary" onClick={this.props.sendToKeyboard}>Send Password for {this.props.labelSelected} to Keyboard</button> : null
                        }
                    </form>
                </div>
            </div>
        );
    }
}

class SelectionScreen extends Component {
    CurrentState = {
        SendingToKeyboard: "SendingToKeyboard",
        SentToKeyboard: "SentToKeyboard",
        DoingNothing: "DoingNothing",
        labelSelected: null
    };

    state = {
        currentState: this.CurrentState.DoingNothing
    };

    sendToKeyboard = () => {
        this.setState({currentState: this.CurrentState.SendingToKeyboard});
        request('/to-keyboard/' + this.state.labelSelected, (error, response, body) => {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            this.setState({currentState: this.CurrentState.SentToKeyboard});
            setTimeout(() => {
                this.setState({currentState: this.CurrentState.DoingNothing});
            }, 3000)
        });
    };

    handleLabelSelectedChange = (value) => {
        this.setState({labelSelected: value});
    };

    render() {
        return (
            <div>
                What password would you like to use?
                <PasswordSelection labels={this.props.labels} sendToKeyboard={this.sendToKeyboard} labelSelected={this.state.labelSelected} onChange={this.handleLabelSelectedChange}/>
                {
                    this.state.currentState === this.state.SendingToKeyboard || this.state.currentState === this.state.SentToKeyboard ?
                        <SendingPassword sendingCompleted={this.state.currentState === this.state.SentToKeyboard} label={this.state.labelSelected}/> :
                        null
                }
                <br/>
                <br/>
                <button type="button" onClick={this.handleGeneratePasswordClick} className="btn btn-primary">Generate New Password</button>
            </div>
        );
    }
}

class App extends Component {
    state = {
        locked: false,
        labels: []
    };

    updateLabels = () => {
        request('http://localhost:5000/get-all-labels', (error, response, body) => {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            if (Array.isArray(JSON.parse(body))) {
                this.setState({labels: JSON.parse(body)})
            }
        });
    };

    lockScreen = () => {
        request('http://localhost:5000/lock', (error, response, body) => {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            this.setState({locked: true});
        });
    };

    componentWillMount() {
        this.updateLabels();
    }

    componentDidMount() {
        this.updateLabels();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Dragon Lock</h1>
                    {this.state.locked ? <LockScreen/> : <SelectionScreen labels={this.state.labels}/>}
                    <br/>
                    {!this.state.locked ? <button type="button" onClick={this.lockScreen} className="btn btn-danger">Lock</button> : null}

                </header>
            </div>
        );
    }
}

export default App;
