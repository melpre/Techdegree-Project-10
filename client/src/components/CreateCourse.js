/////////////// WORK IN PROGRESS:
        /////// Issue 1 - On changes in title and description input fields not populating
        /////// Issue 2 - New course data not being received by api due to 401 authorization error


/* STATEFUL CLASS COMPONENT */

import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    // Initialize state to store new course data and errors (if any)
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    render() {
        // Update state in object with new course data or errors (if any)
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        // Extract authenticatedUser state from this.props (passed down from Context & props)
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        // Mark up of Create Course page
        return (
            <div className="wrap">
                <h2>Create Course</h2>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
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
                                onChange={this.change} />

                                {/* Render instructor name via Context component */}
                                <p>By {authUser.firstName} {authUser.lastName}</p> 

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea 
                                id="courseDescription" 
                                name="courseDescription"
                                type="text"
                                value={description}
                                onChange={this.change} />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                value={estimatedTime}
                                onChange={this.change} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded"
                                type="text"
                                value={materialsNeeded}
                                onChange={this.change} />
                            </div>
                        </div>
                    </React.Fragment>
                    )} />
            </div>
        );
    }

    // change() function updates elements and their values on change events
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // submit() function creates new course associated with authenticated user
    submit = () => {
        // Destructure props to extract context from this.props
        const { context } = this.props;

        // Destructure state object and unpack the following:
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;

        // Define new course data entered by authenticated user
        // New course data will be passed to createCourse() function in <Data> component
        const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded
        };

        // Call createCourse() and pass in new course data AND authenticated user's credentials
        // User credentials MUST PASS auth-handler middleware in api
        context.data.createCourse(course)
            .then( errors => { // chain then() to see if api returns status 400 and errors array
                if (errors.length) { // if errors are present
                    this.setState({ errors }); // update errors state to returned errors from api
                } else { // else if new course is successfully created and sent to api, display log msg:
                    console.log(`${title} is successfully added!`);
                }
            })
            .catch( err => { // handle errors (rejected promises) from server side
                console.log(err);
            })
    }

    // cancel() function re-directs user back to '/' when cancel button clicked
    cancel = () => {
        this.props.history.push('/');
    }
}

// Declare stateful functional component to render Create Course page and store values to update API data
// export default function CreateCourse() {
//     // Initialize state and store values
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [estimatedTime, setEstimatedTime] = useState('');
//     const [materialsNeeded, setMaterialsNeeded] = useState('');
//     const [errors, setErrors] = useState([]);

//     // Declare vars to set state changes in 'title', 'description', 'estimatedTime' and 'materialsNeeded':
//     const handleTitleChange = (event) => setTitle(event.target.value);
//     const handleDescriptionChange = (event) => setDescription(event.target.value);
//     const handleEstimatedTimeChange = (event) => setEstimatedTime(event.target.value);
//     const handleMaterialsNeededChange = (event) => setMaterialsNeeded(event.target.value);
    
//     // Mark up of Create Course form
//     return(
//         <div className="wrap">
//             <h2>Create Course</h2>
//             <Form
//                 cancel={(props) => props.history.push('/')}
//                 errors={errors} // pass errors from handleSubmitNewCourse func (if any)
//                 submit={handleSubmitNewCourse}
//                 submitButtonText="Create Course"
//                 elements={() => (
//                 <React.Fragment>
//                     <div className="main--flex">
//                         <div>
//                             <label htmlFor="courseTitle">Course Title</label>
//                             <input 
//                             id="courseTitle" 
//                             name="courseTitle" 
//                             type="text" 
//                             value={title}
//                             onChange={handleTitleChange} />

//                             {/* Render instructor name via PrivateRoute component */}
//                             <p>By First Name Last Name</p> 

//                             <label htmlFor="courseDescription">Course Description</label>
//                             <textarea 
//                             id="courseDescription" 
//                             name="courseDescription"
//                             type="text"
//                             value={description}
//                             onChange={handleDescriptionChange} />
//                         </div>
//                         <div>
//                             <label htmlFor="estimatedTime">Estimated Time</label>
//                             <input 
//                             id="estimatedTime" 
//                             name="estimatedTime" 
//                             type="text" 
//                             value={estimatedTime}
//                             onChange={handleEstimatedTimeChange} />

//                             <label htmlFor="materialsNeeded">Materials Needed</label>
//                             <textarea 
//                             id="materialsNeeded" 
//                             name="materialsNeeded"
//                             type="text"
//                             value={materialsNeeded}
//                             onChange={handleMaterialsNeededChange} />
//                         </div>
//                     </div>
//                 </React.Fragment>
//                 )} />
//         </div>
//     );

//     function handleSubmitNewCourse() {
//         const title = document.getElementById('courseTitle').value;
//         const description = document.getElementById('courseDescription').value;
//         const estimatedTime = document.getElementById('estimatedTime').value;
//         const materialsNeeded = document.getElementById('materialsNeeded').value;

//         const config = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'requiresAuth': 'true', // set authorization header to true
                
//             },
//             body: JSON.stringify({ 
//                 title, 
//                 description, 
//                 estimatedTime, 
//                 materialsNeeded,
//                 errors 
//             })
//         }

//         fetch(`http://localhost:5000/api/courses`, config)
//             .then(res => res.json())
//             .then(data => console.log(data)) //LOG STATEMENT: to check that data has been updated to db
//             .then( errors => { // chain then() to see if api returns status 400 and errors array
//                 if (errors.length) { // if errors are present
//                     setErrors(errors); // update errors state to returned errors from api
//                 } else { // else if course is successfully created and sent to api, display log msg:
//                     console.log(`${title} is successfully added!`);
//                 }
//             })
//             .catch( err => { // handle errors (rejected promises) from server side
//                 console.log(err);
//             })
//     }
// }




