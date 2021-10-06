////////// NOTES //////////
// Bug: User log in is successful, but when '/courses/:id/update is entered as url path and belongs to user, Forbidden page
// is still rendered. Why?

////////// TO-DO //////////
// Code clean up

/* STATEFUL CLASS COMPONENT */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form';

export default class UpdateCourse extends Component {
    // Initialize state to store course data and errors (if any)
    // state = {
    //     id: '',
    //     title: '',
    //     description: '',
    //     estimatedTime: '',
    //     materialsNeeded: '',
    //     userId: '',
    //     errors: []
    // }

    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: '',
            errors: [],
            isOwner: false
        };
    }

    // componentDidMount() method is called immediately after UpdateCourse component is added to DOM
    componentDidMount() {
        this.setState({ isOwner: true })

        // Declare var to store url param 'id'
        const currentURL = window.location.href;
        const urlParam = currentURL.substring(30, 32);

        // Fetch course detail
        if (this.isOwner) { // if value is true, fetch from api
            fetch(`http://localhost:5000/api/courses/${urlParam}`)
                .then((response) => response.json()) //parse response to JSON
                .then(data => {
                    const {
                        id, 
                        title,
                        description,
                        estimatedTime,
                        materialsNeeded,
                        userId
                    } = data.course;
                    return this.setState({
                        id: id,
                        title: title,
                        description: description,
                        estimatedTime: estimatedTime,
                        materialsNeeded: materialsNeeded,
                        userId: userId,
                        errors: ''
                    });
                })
            .catch(error => { //catch any errors thrown from the fetch call
                if (error) {
                    // Redirect user to '/notfound' if course could not be fetched (E.C. #1)
                    <Redirect to="/notfound" />
                    console.log(error);
                    return this.setState({
                        errors: error
                    })
                }
            });
        }
    }

    // Unmount UpdateCourse component if current user is NOT owner of course
    componentWillUnmount() {
        this.setState({ isOwner: false});
    }

    render() {
        // Extract authenticatedUser state from this.props (passed down from Context & props)
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        // LOG STATEMENT
        console.log('Authorized User ID: ' + authUser.userId);

        // Destructure state object and unpack the following:
        const {
            userId,
            isOwner
        } = this.state;

        // LOG STATEMENT
        console.log('User ID: ' + userId);

        // Mark up of Update Course form
        // E.C. version redirect to '/forbidden' if CURRENT USER is NOT owner of course
        return (
            <div className="wrap">
                {/* { authUser.userId === userId ? ( */}
                { isOwner ? (
                    <React.Fragment>
                        <h2>Update Course</h2>
                        <Form
                            cancel={this.cancel}
                            errors={this.state.errors}
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
                    </React.Fragment>
                ) : (<Redirect to='/forbidden' />)}
            </div>
        );

        // Mark up of Update Course form
        // return (
        //     <div className="wrap">
        //         <h2>Update Course</h2>
        //         <Form
        //             cancel={this.cancel}
        //             errors={this.state.errors}
        //             submit={this.submit}
        //             submitButtonText="Update Course"
        //             elements={() => (
        //             <React.Fragment>
        //                 <div className="main--flex">
        //                     <div>
        //                         <label htmlFor="title">Course Title</label>
        //                         <input 
        //                         id="title" 
        //                         name="title" 
        //                         type="text" 
        //                         value={this.state.title}
        //                         onChange={this.change} />

        //                         {/* Render instructor name via Context component */}
        //                         <p>By {authUser.firstName} {authUser.lastName}</p> 

        //                         <label htmlFor="description">Course Description</label>
        //                         <textarea 
        //                         id="description" 
        //                         name="description"
        //                         type="text"
        //                         value={this.state.description}
        //                         onChange={this.change} />
        //                     </div>
        //                     <div>
        //                         <label htmlFor="estimatedTime">Estimated Time</label>
        //                         <input 
        //                         id="estimatedTime" 
        //                         name="estimatedTime" 
        //                         type="text" 
        //                         value={this.state.estimatedTime}
        //                         onChange={this.change} />

        //                         <label htmlFor="materialsNeeded">Materials Needed</label>
        //                         <textarea 
        //                         id="materialsNeeded" 
        //                         name="materialsNeeded"
        //                         type="text"
        //                         value={this.state.materialsNeeded}
        //                         onChange={this.change} />
        //                     </div>
        //                 </div>
        //             </React.Fragment>
        //             )} />
        //     </div>
        // );

        // Declare var to store url param 'id'
        // const currentURL = window.location.href;
        // const urlParam = currentURL.substring(30, 32);

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
        // Declare var to store url param 'id'
        const currentURL = window.location.href;
        const urlParam = currentURL.substring(30, 32);

        // Destructure props to extract context from this.props
        const { context } = this.props;
        // const authUser = context.authenticatedUser;
        const authEmail = context.emailAddress;
        const authPass = context.password;

        // Destructure state object and unpack the following:
        const {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        } = this.state;

        // Define updated course data entered by authenticated user
        // Updated course data will be passed to updateCourse() function in <Data> component
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };

        // Call updateCourse() and pass in new course data AND authenticated user's credentials
        // User credentials MUST PASS auth-handler middleware in api
        context.data.updateCourse(urlParam, course, authEmail, authPass)
            .then( errors => { // chain then() to see if api returns status 400 and errors array
                if (errors.length) { // if errors are present
                    this.setState({ errors }); // update errors state to returned errors from api
                } else { // else if new course is successfully updated and sent to api, display log msg:
                    console.log(`${title} is successfully updated!`);
                    this.props.history.push(`/courses/${urlParam}`);
                }
            })
            .catch( err => { // handle errors (rejected promises) from server side
                console.log(err);
            })
        
        // LOG STATEMENTS
        // console.log(course);
        // console.log(title);
        // console.log(authUser);
        // console.log(authEmail);
        // console.log(authPass);
        // console.log(userId);
        // console.log(id);
    }

    // cancel() function re-directs user back to '/' when cancel button clicked
    cancel = () => {
        this.props.history.push('/');
    }
}




