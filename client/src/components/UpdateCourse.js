/////////////// WORK IN PROGRESS:
        /////// Issue 1 - var 'errors' not defined
        /////// Issue 2 - state values not rendering in UI


/* STATEFUL CLASS COMPONENT */

import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
    // Initialize state to store course data and errors (if any)
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    // componentDidMount() method is called immediately after UpdateCourse component is added to DOM
    componentDidMount() {
        // Declare var to hold url param 'id'
        const currentURL = window.location.href;
        const id = currentURL.substring(30, 32);

        // Fetch course detail
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then((response) => response.json()) //parse response to JSON
            .then(data => {
                const {
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                } = data.course;
                return this.setState({
                    title: title,
                    description: description,
                    estimatedTime: estimatedTime,
                    materialsNeeded: materialsNeeded,
                    // errors: errors
                });
                // LOG STATEMENT
                // console.log(title);
                // console.log(errors);
            })
            .catch(error => { //catch any errors thrown from the fetch call
                console.log(error);
                return error;
            });
    }

    render() {
        // Extract authenticatedUser state from this.props (passed down from Context & props)
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        // Mark up of Update Course form
        return (
            <div className="wrap">
                <h2>Update Course</h2>
                <Form
                    cancel={this.cancel}
                    // errors={errors}
                    submit={this.submit}
                    submitButtonText="Update Course"
                    elements={() => (
                    <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="title">Course Title</label>
                                <input 
                                id="title" 
                                name="title" 
                                type="text" 
                                value={this.state.title}
                                onChange={this.change} />

                                {/* Render instructor name via Context component */}
                                <p>By {authUser.firstName} {authUser.lastName}</p> 

                                <label htmlFor="description">Course Description</label>
                                <textarea 
                                id="description" 
                                name="description"
                                type="text"
                                value={this.state.description}
                                onChange={this.change} />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                value={this.state.estimatedTime}
                                onChange={this.change} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded"
                                type="text"
                                value={this.state.materialsNeeded}
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

    // submit() function updates course associated with authenticated user
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

        // Define updated course data entered by authenticated user
        // Updated course data will be passed to updateCourse() function in <Data> component
        const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded
        };

        // Call updateCourse() and pass in new course data AND authenticated user's credentials
        // User credentials MUST PASS auth-handler middleware in api
        context.data.updateCourse(course)
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

// Declare stateful functional component to render Update Course page and store values to update API data
    // // Define useState and store values
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [estimatedTime, setEstimatedTime] = useState('');
    // const [instructor, setInstructor] = useState('');
    // const [materialsNeeded, setMaterialsNeeded] = useState('');

    // // Define useEffect to update API with update Course details data
    // useEffect(() => {
    //     // CONDITIONAL: if course ID exists, fetch data
    //     fetch(`http://localhost:5000/api/courses/${id}`)
    //         .then((response) => response.json()) //parse response to JSON
    //         .then((data) => { //update state to data fetched from API
    //             const {
    //                 title,
    //                 description,
    //                 estimatedTime,
    //                 instructor,
    //                 materialsNeeded
    //             } = data.course;

    //             //Set state to each destructured element
    //             setTitle(title);
    //             setDescription(description);
    //             setEstimatedTime(estimatedTime);
    //             setInstructor(instructor);
    //             setMaterialsNeeded(materialsNeeded);
    //         })
    //         .catch((error) => console.log(error)); //catch any errors thrown from the fetch call
    // }, []);

    // // LOG STATEMENTS
    // // console.log(currentURL);
    // // console.log(title);
    // // console.log(description);
    // // console.log(id);
    // // console.log(instructor);
    // // console.log(materialsNeeded);

    // // Declare vars to hold changes in 'title', 'description', 'estimatedTime' and 'materialsNeeded' states:
    // const handleTitleChange = (event) => setTitle(event.target.value);
    // const handleDescriptionChange = (event) => setDescription(event.target.value);
    // const handleEstimatedTimeChange = (event) => setEstimatedTime(event.target.value);
    // const handleMaterialsNeededChange = (event) => setMaterialsNeeded(event.target.value);

    // // DOES NOT WORK CURRENTLY
    // // Send PUT request to API
    // function handleSubmitUpdateCourse(event) {
    //     event.preventDefault();
    //     const title = document.getElementById('courseTitle').value;
    //     const description = document.getElementById('courseDescription').value;
    //     const estimatedTime = document.getElementById('estimatedTime').value;
    //     const materialsNeeded = document.getElementById('materialsNeeded').value;

    //     const config = {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ 
    //             title, 
    //             description, 
    //             estimatedTime, 
    //             materialsNeeded 
    //         })
    //     }

    //     fetch(`http://localhost:5000/api/courses/${id}`, config)
    //         .then(res => res.json())
    //         .then(data => console.log(data)) //LOG STATEMENT: to check that data has been updated to db
    // }

    // // Mark up of Update Course form
    // return (
    //     <div className="wrap">
    //         <h2>Update Course</h2>
    //         {/* <form onSubmit={handleSubmitUpdateCourse}> */}
    //         <form>
    //             <div className="main--flex">
    //                 <div>
    //                     <label htmlFor="courseTitle">Course Title</label>
    //                     {/* Update value of 'title' state on change event listener */}
    //                     <input id="courseTitle" 
    //                            name="courseTitle" 
    //                            type="text" 
    //                            value={title} 
    //                            onChange={handleTitleChange} />

    //                     <p>By {instructor.firstName} {instructor.lastName}</p>

    //                     <label htmlFor="courseDescription">Course Description</label>
    //                     {/* Update value of 'description' state on change event listener */}
    //                     <textarea id="courseDescription" 
    //                               name="courseDescription" 
    //                               type="text" 
    //                               value={description} 
    //                               onChange={handleDescriptionChange} />
    //                 </div>
    //                 <div>
    //                     <label htmlFor="estimatedTime">Estimated Time</label>
    //                     {/* Update value of 'estimatedTime' state on change event listener */}
    //                     <input id="estimatedTime" 
    //                            name="estimatedTime" 
    //                            type="text" 
    //                            value={estimatedTime} 
    //                            onChange={handleEstimatedTimeChange} />

    //                     <label htmlFor="materialsNeeded">Materials Needed</label>
    //                     {/* Update value of 'materialsNeeded' state on change event listener */}
    //                     <textarea id="materialsNeeded" 
    //                               name="materialsNeeded" 
    //                               type="text" 
    //                               value={materialsNeeded} 
    //                               onChange={handleMaterialsNeededChange} />
    //                 </div>
    //             </div>
    //             <NavLink exact to="/">
    //                 <button className="button" type="submit" onClick={handleSubmitUpdateCourse}>Update Course</button>
    //             </NavLink>
    //             <NavLink to={`/courses/${id}`}>
    //                 <button className="button button-secondary">Cancel</button>
    //             </NavLink>
    //         </form>
    //     </div>
    // );
// }
