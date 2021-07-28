// HIGHER-ORDER COMPONENT (HOC)

import React, { Component } from 'react';

// Set up Context by calling method
const Context = React.createContext();

// Set up Provider class to return Provider component that provides app state and event handlers to components
export class Provider extends Component {

    // Store initial state to value stored in 'authenticatedUser' cookie or null
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    }

    // Initialize new instance of Data class
    constructor() {
        super();
        this.data = new Data();
    }

    // Render Provider component passing in VALUE object containing 
    render() {
        // Using destructuring, extract authenticatedUser property from state
        const { authenticatedUser } = this.state;

        // Initialize const VALUE and set to object that contains properties: authenticatedUser, data, and actions.
        // Store authenticatedUser taken from state, this.data to data (any data passed down) and actions (holds any event handlers passed down from context)
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn, // set signIn prop to signIn func
                signOut: this.signOut // set signOut prop to signOut func
            }
        };

        // Pass Context Provider VALUE to be shared across component tree
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    // The signIn function is an asynchronous function that takes a username and password as 
    // arguments. signIn uses those credentials to call the getUser() method in Data.js, 
    // which makes a GET request to the protected /users route on the server and returns the 
    // user data.
    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user !== null) {
            this.setState(() => {
                return {
                authenticatedUser: user,
                };
            });
        // Set cookie that stores authenticated user's name and username
        // The first argument passed to Cookies.set() specifies the name of the 
        // cookie to set. Pass 'authenticatedUser' as the cookie name.
        // The second argument specifies the value to store in the cookie. In this 
        // case, store the stringified user object.
        // Pass Cookies.set() an object as the last argument to set additional cookie 
        // options -- for example, an expiration.
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }   
        return user;
    }

    signOut = () => {
        this.setState(() => { 
            return {
                authenticatedUser: null,
            };
        });
        Cookies.remove('authenticatedUser'); // deletes 'authenticatedUser' cookie created by Cookies.set()
    }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * withContext automatically subscribes the component passed to it all
 * actions and context changes.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}








