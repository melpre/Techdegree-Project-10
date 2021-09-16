/* STATEFUL FUNCTION COMPONENT */

// Import React and useState, useEffect hooks
import React, { useState } from 'react';
import Form from './Form';

// Declare stateful functional component to render Create Course page and store values to update API data
export default function CreateCourse() {

    // Initialize state and store values
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    // Declare vars to set state changes in 'title', 'description', 'estimatedTime' and 'materialsNeeded':
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleEstimatedTimeChange = (event) => setEstimatedTime(event.target.value);
    const handleMaterialsNeededChange = (event) => setMaterialsNeeded(event.target.value);

    // DOES NOT WORK CURRENTLY
    // Send POST request to API
    // useEffect(function handleSubmitNewCourse(event) {
    //         event.preventDefault();
    //         const title = document.getElementById('courseTitle').value;
    //         const description = document.getElementById('courseDescription').value;
    //         const estimatedTime = document.getElementById('estimatedTime').value;
    //         const materialsNeeded = document.getElementById('materialsNeeded').value;
    
    //         const config = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
                    
    //             },
    //             body: JSON.stringify({ 
    //                 title, 
    //                 description, 
    //                 estimatedTime, 
    //                 materialsNeeded 
    //             })
    //         }
    
    //         fetch(`http://localhost:5000/api/courses`, config)
    //             .then(res => res.json())
    //             .then(data => console.log(data)) //LOG STATEMENT: to check that data has been updated to db
    //     }
    // )
    
    // Mark up of Create Course form
    return(
        <div className="wrap">
            <h2>Create Course</h2>
            <Form
                cancel={(props) => props.history.push('/')}
                errors={(errors) => setErrors(errors)}
                submit={handleSubmitNewCourse}
                submitButtonText="Create Course"
                elements={() => (
                <React.Fragment>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                            id="courseTitle" 
                            name="courseTitle" 
                            type="text" 
                            value={title}
                            onChange={handleTitleChange} />

                            {/* Render instructor name via PrivateRoute component */}
                            <p>By First Name Last Name</p> 

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                            id="courseDescription" 
                            name="courseDescription"
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text" 
                            value={estimatedTime}
                            onChange={handleEstimatedTimeChange} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded"
                            type="text"
                            value={materialsNeeded}
                            onChange={handleMaterialsNeededChange} />
                        </div>
                    </div>
                </React.Fragment>
                )} />
        </div>
    );

    function handleSubmitNewCourse() {
        const title = document.getElementById('courseTitle').value;
        const description = document.getElementById('courseDescription').value;
        const estimatedTime = document.getElementById('estimatedTime').value;
        const materialsNeeded = document.getElementById('materialsNeeded').value;

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({ 
                title, 
                description, 
                estimatedTime, 
                materialsNeeded 
            })
        }

        fetch(`http://localhost:5000/api/courses`, config)
            .then(res => res.json())
            .then(data => console.log(data)) //LOG STATEMENT: to check that data has been updated to db
    }
}




