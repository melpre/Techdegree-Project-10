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
        authenticatedUser: null
      }
  }

  render() {
    // Extract authenticatedUser from this.state
    const { authenticatedUser } = this.state;
    // Declare var 'value' to equal an object and assign it the utility methods of the Data class
    const value = {
        authenticatedUser,
        data: this.data,
        actions: { // add the actions property and object
          signIn: this.signIn
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
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    // If user is NOT null, update authenticatedUser state to value of user
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user
        };
      });
    }
    
    // LOG STATEMENTS
    console.log(user);

    return user;
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








