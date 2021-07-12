/* STATEFUL CLASS COMPONENT */

// Import React and useState hook
import React, { Component } from 'react';

// Declare stateful functional component to render Sign Up page and store state for authentication
class UserSignUp extends Component {
    // Define state to include user credentials and errors if any
    state = {
        name: '',
        username: '',
        password: '',
        errors: []
    }

    render() {
        // Store state in object with user credentials and errors if any
        const {
            name,
            username,
            password,
            errors
        } = this.state;

        // Mark up of Sign Up page
        return(
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form />
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value="" />
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value="" />
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="" />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value="" />
                    <label for="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" value="" />
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>

                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        );
    }
}

export default UserSignUp;