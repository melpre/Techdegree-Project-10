/* STATEFUL CLASS COMPONENT */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';

// Declare stateful class component to render Sign In page and store state for authentication
export default class UserSignIn extends Component {
    // Initialize state to include user credentials and errors if any
    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    handleLogInUser(event) {
        event.preventDefault();
        console.log('Event fired when clicked');
    }

    render() {
        // Update state in object with user credentials and errors if any
        const {
            emailAddress,
            password,
            errors,
        } = this.state;
        
        // Mark up of Sign In page
        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign In"

                    elements={() => (
                    <React.Fragment>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={emailAddress} 
                        onChange={this.change} />
                        <label htmlFor="password">Password</label>
                        <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={password}
                        onChange={this.change} />
                    </React.Fragment>
                    )} />
                <p>
                    Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!
                </p>
            </div>
        );
    }

    // change() function updates elements and their values on change events
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // submit() function logs in authenticated user upon submitting form
    submit = () => {
        // Destructure props to extract context from this.props
        const { context } = this.props;

        // Destructure state object and unpack the following:
        const { emailAddress, password } = this.state;

        // Call signIn() method defined in Context and now avaiable to UserSignIn component
        context.actions.signIn(emailAddress, password)
            .then( user => {
                if (user === null) { // also means request status response is 401
                    this.setState(() => {
                        return { errors: [ 'Sign-in was unsuccessful' ] };
                    });
                } else {
                    this.props.history.push(`/`);
                }
            })
    }

    // cancel() function re-directs user back to '/' when cancel button clicked
    cancel = () => {
        this.props.history.push('/');
    }
}