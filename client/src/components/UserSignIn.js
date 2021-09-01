/* STATEFUL CLASS COMPONENT */

// Import React and Component extension
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Declare stateful class component to render Sign In page and store state for authentication
class UserSignIn extends React.Component {

    // Initialize state to store username, password and errors (if any)
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            errors: []
        };
    }

    handleLogInUser(event) {
        event.preventDefault();
        console.log('Event fired when clicked');
    }

    // Assign values username, password and errors (if any) to props for rendering
    render() {
        const {
            username,
            password,
            errors,
        } = this.state;
        
        // Mark up of Sign In page
        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" 
                           name="emailAddress" 
                           type="email" 
                        //    value={username} 
                           onChange={this.change} />
                    <label htmlFor="password">Password</label>
                    <input id="password" 
                           name="password" 
                           type="password" 
                        //    value={password}
                           onChange={this.change} />
                    <button className="button" type="submit" onClick={this.handleLogInUser}>Sign In</button>
                    <NavLink to="/signup">
                        <button className="button button-secondary" onClick="event.preventDefault()">Cancel</button>
                    </NavLink>
                </form>
                <p>
                    Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!
                </p>
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // Submit function to authenticate User
    // submit = () => {

    // }

    // Cancel function to redirect user to main Courses page
    // cancel = () => {

    // }
}

export default UserSignIn;