/* STATEFUL FUNCTION COMPONENT */

// Import React libraries and hooks
import React, { useState, useEffect } from 'react';
// import React, { useState, useEffect, useContext } from 'react'; //import useContext to subscribe to withContext()
import { NavLink } from 'react-router-dom';

// Import Context
// import withContext from '../Context';


// Declare stateful functional component to retrieve a course's details from API data
export default function CourseDetail() {
    // call useContext to return context object
    // const { props } = useContext(withContext);

    // Declare var to hold url param 'id'
    const currentURL = window.location.href;
    const id = currentURL.substring(30);

    // Define useState and store values
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [instructor, setInstructor] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // CONDITIONAL: if course ID exists, fetch data
        async function fetchCourse()  {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                const data = await response.json();
                const {
                    title, 
                    description, 
                    estimatedTime, 
                    instructor, 
                    materialsNeeded,
                    userId
                } = data.course;

                //Set state to each destructured element
                setTitle(title);
                setDescription(description);
                setEstimatedTime(estimatedTime);
                setInstructor(instructor);
                setMaterialsNeeded(materialsNeeded);
                setUserId(userId);

            //Catch any errors thrown from the fetch call
            } catch (error) { 
                return console.log(error);
            }
        }
        fetchCourse();
    }, []);

    // LOG STATEMENTS
    // console.log(currentURL);
    // console.log(title);
    // console.log(description);
    // console.log(instructor);
    // console.log(materialsNeeded);
    // console.log(userId);

    // Format Materials Needed into List
    function formatMaterialsList(string) {
        if (materialsNeeded != null) {
            const listMaterials = string.split('*'||',');
            listMaterials.shift();
            return listMaterials.map((listItem, i) => <li key={i}>{listItem}</li>)
        }
    };

    // Delete course on click
    // function deleteCourseOnClick(id) {

    // }

    // Mark up of returned course's details
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {/* Display Update and Delete buttons IF USER is authenticated */}
                    <NavLink exact to={`/courses/${id}/update`} className="button">Update Course</NavLink>
                    <NavLink exact to="/" className="button">Delete Course</NavLink>
                    {/* <NavLink exact to="/" className="button" onClick={deleteCourseOnClick(id)}>Delete Course</NavLink> */}
                    <NavLink exact to="/" className="button button-secondary">Return to List</NavLink>
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
                                {/* temporary formatting. RE-DO */}
                                {/* {materialsNeeded}  */}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}



