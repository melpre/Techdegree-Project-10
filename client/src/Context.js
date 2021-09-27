import React, { Component } from 'react';
// import Cookies from 'js-cookie'; // import JavaScript cookie library
import Data from './Data'; // import Data.js containing helper class

const Context = React.createContext();

export class Provider extends Component {
  // Initialize new instance of Data class and assign it to a 'data' property
  constructor() {
      super();
      this.data = new Data();
      this.state = {
        authenticatedUser: null,
        emailAddress: '',
        password: '',
      }
  }

  render() {
    // Extract authenticatedUser, email, password, userId from this.state
    const { 
      authenticatedUser,
      emailAddress,
      password,
    } = this.state;

    // Declare var 'value' to equal an object and assign it the utility methods and props of the Data class
    const value = {
        authenticatedUser,
        emailAddress,
        password,
        data: this.data,
        actions: { // add the actions property and object
          signIn: this.signIn,
          signOut: this.signOut
        }
    };

    return (
    // Assign context Provider a value property equal to a value object to be shared throughout component tree
    <Context.Provider value={value}>
      {this.props.children}
    </Context.Provider>  
    );
  }

  // signIn() method retrieves registered user's credentials from api then logs them in upon submitting
  // Persist returned user's record and store user's password in global state
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    // If user is NOT null, update authenticatedUser state to value of user
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,       // set state of user
          emailAddress: emailAddress,    // set state of user's email
          password: password,            // set state of user's password
        };
      });

      // LOG STATEMENTS
      // console.log(user);

      // store user in localStorage
      // localStorage.setItem('emailAddress', user.emailAddress);
      // console.log(localStorage);
    }

    return user;
  }

  // signOut() method removes authenticated user and password from global state and redirects user to '/'
  signOut = () => {
    this.setState({ authenticatedUser: null });
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








