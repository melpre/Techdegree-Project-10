// import { response } from 'express';
// import React and useState, useEffect hook
import React, { useState, useEffect} from 'react';
import './App.css';

/** Update the React App component (src/App.js file) to call the REST API to get a list of courses and render the results. **/
function App() {
  /* Steps to fetch data:*/
  /// Store json response from courses API
  const [data, setData] = useState([]);

  // define useEffect to fetch API data: courses list
  useEffect(() => {
    fetch('https://localhost:5000/api/courses') //Pass the URL to the fetch API.
      .then((response) => response.json()) //Next we will parse the response object and extract the json response that is obtained.
      .then((json) => setData(json)) //UI will display the data response.
      .catch((error) => console.log(error)); //Catch any errors thrown from the fetch call.
  }, []);

  return (
    // Mark up unordered list of courses
    <div>
      <ul>
       {data.map((course, index) => (<li key={index}>{course}</li>))}
      </ul>
    </div>
  );
}

export default App;
