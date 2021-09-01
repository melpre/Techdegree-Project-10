/* STATEFUL FUNCTIONAL COMPONENT */

// Import React and useState, useEffect hooks
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Declare stateful functional component to render Update Course page and store values to update API data
function UpdateCourse() {
    
    // Declare var to hold url param 'id'
    const currentURL = window.location.href;
    const id = currentURL.substring(30, 32);

    // Define useState and store values
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [instructor, setInstructor] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    // Define useEffect to update API with update Course details data
    useEffect(() => {
        // CONDITIONAL: if course ID exists, fetch data
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then((response) => response.json()) //Parse response to JSON
            .then((data) => { //Update state to data fetched from API
                const {
                    title,
                    description,
                    estimatedTime,
                    instructor,
                    materialsNeeded
                } = data.course;

                //Set state to each destructured element
                setTitle(title);
                setDescription(description);
                setEstimatedTime(estimatedTime);
                setInstructor(instructor);
                setMaterialsNeeded(materialsNeeded);
            })
            .catch((error) => console.log(error)); //Catch any errors thrown from the fetch call
    }, []);

    // LOG STATEMENTS
    // console.log(currentURL);
    // console.log(title);
    // console.log(description);
    // console.log(id);
    // console.log(instructor);
    // console.log(materialsNeeded);

    // Declare vars to hold changes in 'title', 'description', 'estimatedTime' and 'materialsNeeded' states:
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleEstimatedTimeChange = (event) => setEstimatedTime(event.target.value);
    const handleMaterialsNeededChange = (event) => setMaterialsNeeded(event.target.value);

    // DOES NOT WORK CURRENTLY
    // Send PUT request to API
    function handleSubmitCourseData(event) {
        event.preventDefault();
        const title = document.getElementById('courseTitle').value;
        const description = document.getElementById('courseDescription').value;
        const estimatedTime = document.getElementById('estimatedTime').value;
        const materialsNeeded = document.getElementById('materialsNeeded').value;

        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                title, 
                description, 
                estimatedTime, 
                materialsNeeded 
            })
        }

        fetch(`http://localhost:5000/api/courses/${id}`, config)
            .then(res => res.json())
            .then(data => console.log(data)) //LOG STATEMENT: to check that data has been updated to db
    }

    // const handleSubmitCourseData = (event) => {
    //     event.preventDefault();
    //     fetch(`http://localhost:5000/api/courses/${id}`, { 
    //         method: 'PUT',
    //         data: {
    //           title: handleTitleChange,
    //           description: handleDescriptionChange,
    //           estimatedTime: handleEstimatedTimeChange,
    //           materialsNeeded: handleMaterialsNeededChange
    //         }
    //       })
    //       .then(function(response) {
    //         return response.json()
    //       }).then(function(body) {
    //         console.log(body);
    //       });
    // }

    // Mark up of Update Course form
    return(
        <div className="wrap">
            <h2>Update Course</h2>
            {/* <form onSubmit={handleSubmitCourseData}> */}
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        {/* Update value of 'title' state on change event listener */}
                        <input id="courseTitle" 
                               name="courseTitle" 
                               type="text" 
                               value={title} 
                               onChange={handleTitleChange} />

                        <p>By {instructor.firstName} {instructor.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        {/* Update value of 'description' state on change event listener */}
                        <textarea id="courseDescription" 
                                  name="courseDescription" 
                                  type="text" 
                                  value={description} 
                                  onChange={handleDescriptionChange} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        {/* Update value of 'estimatedTime' state on change event listener */}
                        <input id="estimatedTime" 
                               name="estimatedTime" 
                               type="text" 
                               value={estimatedTime} 
                               onChange={handleEstimatedTimeChange} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        {/* Update value of 'materialsNeeded' state on change event listener */}
                        <textarea id="materialsNeeded" 
                                  name="materialsNeeded" 
                                  type="text" 
                                  value={materialsNeeded} 
                                  onChange={handleMaterialsNeededChange} />
                    </div>
                </div>
                <NavLink exact to="/">
                    <button className="button" type="submit" onClick={handleSubmitCourseData}>Update Course</button>
                </NavLink>
                <NavLink to={`/courses/${id}`}>
                    <button className="button button-secondary">Cancel</button>
                </NavLink>
            </form>
        </div>
    );
}

export default UpdateCourse;