////////// NOTES //////////
// NotFound component renders without HeaderWithContext 


////////// TO-DO //////////


// Import React libraries and stylesheets
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/reset.css'; // This has to be imported first BEFORE global.css (WHY??)
import './styles/global.css';

// Import components
import Header from './components/Header.js';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import CreateCourse from './components/CreateCourse.js';
import UpdateCourse from './components/UpdateCourse.js';
import UserSignIn from './components/UserSignIn.js';
import UserSignUp from './components/UserSignUp.js';
import UserSignOut from './components/UserSignOut.js';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './PrivateRoute';

// Import higher order function 'withContext' to subscribe a component passed to it all actions and context changes
import withContext from './Context'; 

// Connect Components to context:
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut); 
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail); // connect Course Detail component to higher order func withContext()

function App() {
  return (
    <BrowserRouter>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        
        {/* E.C. #1 */}
        <Route path="/notfound" component={NotFound} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path ="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;




