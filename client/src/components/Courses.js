/* STATEFUL FUNCTIONAL COMPONENT */

// Import React and useState, useEffect hooks
import React, { useState, useEffect } from 'react';

// Declare stateful functional component to retrieve list of courses' titles from API data
function Courses() {
    // Define useState and store values
    const [courses, setCourses] = useState([]);
  
    // Define useEffect to fetch API data: courses list
    useEffect(() => {
      fetch('http://localhost:5000/api/courses') //Pass the URL to the fetch API
        .then((response) => response.json()) //Parse response to JSON
        .then((courses) => setCourses(courses.courses)) //Update state to data fetched from API
        .catch((error) => console.log(error)); //Catch any errors thrown from the fetch call
    }, []);

    // LOG STATEMENT
    console.log(courses);
  
    // Mark up of list of courses
    return (
        <div className="wrap main--grid">
            {courses.map((course) => 
                <a key={course.id} className="course--module course--link" href="course-detail.html">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </a>
            )}

            <a className="course--module course--add--module" href="create-course.html">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    );
  }
  
  export default Courses;