/* STATEFUL FUNCTIONAL COMPONENT */

// Import React libraries and hooks
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Declare stateful functional component to retrieve a course's details from API data
function CourseDetail() {
    // Declare var to hold url param 'id'
    const currentURL = window.location.href;
    const id = currentURL.substring(currentURL.lastIndexOf('/') + 1);

    // Define useState and store values
    const [courseDetails, setCourseDetails] = useState({});

    // Declare vars of property values from each course to render
    const { 
        title, 
        description, 
        estimatedTime,
        instructor,
        materialsNeeded 
    } = courseDetails;

    const {
        firstName,
        lastName
    } = instructor;

    // Define useEffect to fetch API data: course details
    useEffect(() => {
        // CONDITIONAL: if course ID exists, fetch data
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then((response) => response.json()) //Parse response to JSON
            .then((courseDetails) => setCourseDetails(courseDetails.course)) //Update state to data fetched from API
            .catch((error) => console.log(error)); //Catch any errors thrown from the fetch call
    }, []);

    // LOG STATEMENTS
    console.log(courseDetails);
    console.log(currentURL);
    console.log(id);
    console.log(instructor);

    // Mark up of returned course's details
    // REFACTOR the course details passed in render to shortened variable versions
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink to="courses/:id/update"><a className="button">Update Course</a></NavLink>
                    <NavLink exact to="/"><a className="button">Delete Course</a></NavLink>
                    <NavLink exact to="/"><a className="button button-secondary">Return to List</a></NavLink>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{title}</h4>
                            <p>By {firstName} {lastName}</p>
                            <p>{description}</p>
                        </div>

                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <p>{materialsNeeded}</p>
                            <ul className="course--detail--list">
                                {/* {courseDetails.map((detail) => <li>{courseDetails.materialsNeeded}</li>)} */}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CourseDetail;