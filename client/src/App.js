// import React and useState, useEffect hook
import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  // Declare variable to hold initial state: list of courses in an array 
  // and function that will update state: function to add courses in a list
  const [coursesList, setCoursesList] = useState();

  // define useEffect to fetch API data: courses list
  useEffect(() => {
    console.log('useEffect called');
    fetch('https://localhost:5000/api/courses')
      .then(res => res.json())
      .then(coursesList => setCoursesList(coursesList))
      .catch(err => console.log('Oh noes', err));
  }, [coursesList, setCoursesList]);

  return (
    <div>Courses List: { coursesList }</div>
  );
}

export default App;
