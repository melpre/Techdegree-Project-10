/* STATEFUL FUNCTIONAL COMPONENT */

// Import React and useState, useEffect hooks
import React, { useState, useEffect } from 'react';

// Declare stateful functional component to render Create Course page and store values to update API data
function UpdateCourse() {
    // Define useState and store values
    const [courseDetails, setCourseDetails] = useState([]);

    // Define useEffect? to update API with update Course details data

    // Mark up of Update Course form
    return(
        <div className="wrap">
            <h2>Update Course</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <label for="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value="Build a Basic Bookcase" />

                        <p>By Joe Smith</p>

                        <label for="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription">Text description goes here.</textarea>
                    </div>
                    <div>
                        <label for="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value="14 hours" />

                        <label for="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded">Description of materials needed goes here.</textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
            </form>
        </div>
    );
}

export default UpdateCourse;