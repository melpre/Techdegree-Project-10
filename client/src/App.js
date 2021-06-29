// import React and useState, useEffect hook
import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  // Define useState and store values
  const [courses, setCourses] = useState([]);

  // Define useEffect to fetch API data: courses list
  useEffect(() => {
    fetch('http://localhost:5000/api/courses') //Pass the URL to the fetch API
      .then((response) => response.json()) //Parse response to JSON
      .then((courses) => setCourses(courses.courses)) //Update state to data fetched from API
      .catch((error) => console.log(error)); //Catch any errors thrown from the fetch call
  }, []);

  // Mark up of unordered list of courses
  return (
    <div>List of courses goes here.
      <ul>{courses.map((course) => <li key={course.id}>{course.title}</li>)}</ul>
    </div>
  );
}

export default App;
