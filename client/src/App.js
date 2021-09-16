// Import React libraries and stylesheets
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

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
import PrivateRoute from './PrivateRoute';

// Import higher order function 'withContext' to subscribe a component passed to it all actions and context changes
import withContext from './Context'; 

// Connect Components to context:
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CreateCourseWithContext = withContext(CreateCourse);

function App() {
  return (
    <BrowserRouter>
        <main>
          <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={Courses} />
            {/* <PrivateRoute> */}
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetail} /> 
            {/* <PrivateRoute> */}
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOut} />
          </Switch>
        </main>
    </BrowserRouter>
  )
}

export default App;
