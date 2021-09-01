/* STATEFUL FUNCTIONAL COMPONENT */

// Import React libraries and hooks
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


// Declare stateful functional component to retrieve a course's details from API data
function CourseDetail() {
    // Declare var to hold url param 'id'
    const currentURL = window.location.href;
    const id = currentURL.substring(30);

    // Define useState and store values
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [instructor, setInstructor] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

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

    // Format Materials Needed into List
    function formatMaterialsList(string) {
        if (materialsNeeded != null) {
            const listMaterials = string.split('*');
            listMaterials.shift();
            return listMaterials.map((listItem) => <li>{listItem}</li>)
        }
    };

    // Mark up of returned course's details
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink exact to={`/courses/${id}/update`}><a className="button">Update Course</a></NavLink>
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
                            <p>By {instructor.firstName} {instructor.lastName}</p>
                            <p>{description}</p>
                        </div>

                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {formatMaterialsList(materialsNeeded)}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CourseDetail;