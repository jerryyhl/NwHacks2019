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
    state = {
        newLabel: ""
    };

    generatePassword = () => {
        request('http://localhost:5000/generate/' + this.state.newLabel, (error, response, body) => {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            this.props.updateAfterLabel();
        });
    };

    onLabelChange = (event) => {
        this.setState({newLabel: event.target.value})
    };

    render() {
        return (
            <div>
                Please enter a label for the password that will be generated.
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" aria-describedby="A label for your password" placeholder="Label" value={this.state.newLabel} onChange={this.onLabelChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.generatePassword}>Generate Password For Label</button>
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
        DoingNothing: "DoingNothing"
    };

    state = {
        currentState: this.CurrentState.DoingNothing,
        labelSelected: null
    };

    sendToKeyboard = () => {
        this.setState({currentState: this.CurrentState.SendingToKeyboard});
        request('http://localhost:5000/to-keyboard/' + this.state.labelSelected, (error, response, body) => {
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
                <PasswordSelection labels={this.props.labels} sendToKeyboard={this.sendToKeyboard} labelSelected={this.state.labelSelected} onChange={this.handleLabelSelectedChange} />
                {
                    this.state.currentState === this.state.SendingToKeyboard || this.state.currentState === this.state.SentToKeyboard ?
                        <SendingPassword sendingCompleted={this.state.currentState === this.state.SentToKeyboard} label={this.state.labelSelected}/> :
                        null
                }
                <br/>
                <br/>
                <NewLabelInput updateAfterLabel={this.props.updateAfterLabel}/>
            </div>
        );
    }
}

class App extends Component {
    state = {
        locked: true,
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

    checkLocked = () => {
        request('http://localhost:5000/is-locked', (error, response, body) => {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            this.setState({locked: JSON.parse(body).locked});
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
        this.checkLocked();
    }

    componentDidMount() {
        this.updateLabels();
        this.checkLocked();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Dragon Lock</h1>
                    {this.state.locked ? <LockScreen handleCorrectPassword={() => {this.setState({locked: false})}} /> : <SelectionScreen updateAfterLabel={this.updateLabels} labels={this.state.labels}/>}
                    <br/>
                    {!this.state.locked ? <button type="button" onClick={this.lockScreen} className="btn btn-danger">Lock</button> : null}

                </header>
            </div>
        );
    }
}

export default App;
