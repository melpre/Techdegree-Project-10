// import React and useState, useEffect hook
import React, { useState, useEffect} from 'react';
import './App.css';

/** Update the React App component (src/App.js file) to call the REST API to get a list of courses and render the results. **/
function App() {
  /* Steps to fetch data: */
  /// Store json response from courses API
  const [data, setData] = useState();
  const courses = data;

  // Define useEffect to fetch API data: courses list
  useEffect(() => {
    fetch('http://localhost:5000/api/courses') //Pass the URL to the fetch API
      .then((response) => response.json()) //Parse response to JSON
      .then((data) => setData(data.courses)) //Set state to data parsed from JSON
      .catch((error) => console.log(error)); //Catch any errors thrown from the fetch call
  }, []);

  console.log(courses);

  return (
    // Mark up unordered list of courses
    <div>List of courses goes here.
      <ul>{courses.map((course) => <li>{course}</li>)}</ul>
    </div>
  );
}

export default App;
