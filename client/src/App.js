// Import React libraries and stylesheets
import React from 'react';
import {
  BrowserRouter,
  Route
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


function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Route exact path="/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOut} />
      </main>
    </BrowserRouter>
  )
}

export default App;
