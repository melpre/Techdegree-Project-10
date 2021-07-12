/* STATELESS FUNCTIONAL COMPONENT */

// Import React libraries
import React from 'react';
import { NavLink } from 'react-router-dom';

// Declare function to render Header elements
function Header() {
    // Mark up of Header
    return (
        <header>
            <div class="wrap header--flex">
                <h1 class="header--logo"><NavLink exact to="/">Courses</NavLink></h1>
                <nav>
                    <ul class="header--signedout">
                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                        <li><NavLink to="/signin">Sign In</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header> 
    );
}

export default Header;

