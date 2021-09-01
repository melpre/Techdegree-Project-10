// DATA (HELPER) CLASS:

import config from './config';

export default class Data {
  // api() method will make GET and POST requests to /user endpoint of api
  api(path, method = 'GET', body = null) {
    // Declare var 'url' and assign it to config url + path name
    const url = config.apiBaseUrl + path;
  
    // Declare options object that sends request with the HTTP method, the request headers and a stringified body (if provided)
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // // check if auth is required
    // // If we're making a request to a protected route on the server, authentication 
    // // is required (the requiresAuth is true). In that case, we'll encode the user 
    // // credentials and set the HTTP Authorization request header to the Basic Authentication 
    // // type, followed by the encoded user credentials.
    // if (requiresAuth) {
    //   // The btoa() method creates a base-64 encoded ASCII string from a "string" of data. 
    //   // We'll use btoa() to encode the username and password credentials passed to the api() 
    //   // method. The credentials will be passed as an object containing username and password 
    //   // properties. Make sure to use : colon between each property
    //   const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    //   // add authorization property to headers object and set to var encodedCredentials
    //   options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    // }

    return fetch(url, options);
  }

  // getUser() makes GET request to /users endpoint, and returns JSON object containing user credentials.
  // To authenticate user using credentials, set requiresAuth param to 'true' and credentials to
  // properties 'username' and 'password' from credentials object.
  // async getUser(username, password) {
  //   const response = await this.api('/users', 'GET', null, true, { username, password });
  //   if (response.status === 200) {
  //     return response.json().then(data => data);
  //   }
  //   else if (response.status === 401) {
  //     return null;
  //   }
  //   else {
  //     throw new Error();
  //   }
  // }

  // createUser() makes POST request, sending new user data to the /users endpoint.
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}

