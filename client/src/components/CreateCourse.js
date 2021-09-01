/* STATEFUL FUNCTIONAL COMPONENT */

// Import React and useState, useEffect hooks
import React, { useState, useEffect } from 'react';

// Declare stateful functional component to render Create Course page and store values to update API data
function CreateCourse() {
    // Define useState and store values
    const [newCourse, setNewCourse] = useState([]);

    // Define useEffect? to update API with newCourse data

    // Mark up of Create Course form
    return(
        <div className="wrap">
            <h2>Create Course</h2>
            {/* VALIDATION ERROR DISPLAY (CURRENTLY AS SEPARATE COMPONENT INSIDE FORM.JS) */}
            {/* <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
            </div> */}
            {/* VALIDATION ERROR DISPLAY (CURRENTLY MOVED TO FORM.JS) */}
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value="" />

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription"></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value="" />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
            </form>
        </div>
    );
}

export default CreateCourse;