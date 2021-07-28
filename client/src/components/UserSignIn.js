/* STATEFUL CLASS COMPONENT */

// Import React and Component extension
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Declare stateful functional component to render Sign In page and store state for authentication
class UserSignIn extends Component {
    // Define state to include user credentials and errors if any
    state = {
        username: '',
        password: '',
        errors: []
    }

    render() {
        // Store state in object with user credentials and errors if any
        const {
            username,
            password,
            errors
        } = this.state;

        // Mark up of Sign In page
        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form />
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="" />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value="" />
                    <button className="button" type="submit">Sign In</button>
                    <NavLink to="/signup"><button className="button button-secondary" onclick="event.preventDefault()">Cancel</button></NavLink>
                
                <p>Don't have a user account? Click here to <NavLink to="/signup"><a>sign up</a></NavLink>!</p>
                
            </div>
        );
    }
}

export default UserSignIn;