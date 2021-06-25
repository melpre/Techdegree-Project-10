# Techdegree-Project-10
 My Final Techdegree Project: Full Stack App with React and a REST API

 Project Overview:
 In your final project, you’ll use React to create a client for your existing school database REST API (that you created in a previous project). The full stack application will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.

In addition, the project will require users to create an account and sign in to make changes to the database. Implementing these features will push your React skills to new heights.

To complete this project, you’ll use your knowledge of React, JSX, React Router, React Context API, and Create React App.

After using the Create React App tool to set up your initial project, you'll:

Use JavaScript and JSX to build out the components for your application in a modular fashion.
Use React Router to set up your routes.
Use the Fetch API or a tool like Axios to fetch data from your REST API.
Allow users to sign up and use basic authentication to support users signing in.
Add to the supplied CSS to personalize the project.



Before You Start:
1. Review the policy on Reusing Code in a Techdegree project.

2. GitHub
    Create a new repo for this project.
    Create a .gitignore and use it to make sure your node_modules folder is not stored in or tracked by your repo.
    Create a README.md file for your repo that explains what the project is and anything your user or fellow developers might need to know to use the project.

3. Understand what you are working with
    Have a basic understanding of React, JSX, Create React App, React Router, React Context API, React authentication, and working with APIs. See the Resources links on this page and the material in this unit for more for help understanding these concepts.

4. Download the project files
    * The markup folder contains a collection of HTML files that will show you how each page in the app should be structured.
    * The styles/global.css file contains all the styles you will need for this project, but you are encouraged to experiment with things like colors, background colors, and fonts.
    * The mockups folder contains a collection of PNG image files showing you how each page should look with the provided HTML and CSS applied.

5. Follow the instructions below
    * Be sure to reach out on Slack if you get stuck or run into difficulties.



Project Instructions
1. Create your React project
    * Use the create-react-app tool to set up and create your React project in a folder named client.
    * To do this, run the command npx create-react-app client from the root of your repo.
    NOTE: npx is not a typo — it’s a package runner tool that comes with npm 5.2+.

2. Set up your REST API
    * Add a folder named api to the root of your repo.
    * Copy the REST API Express application from your unit 9 project into the api folder.

3. Add CORS support to your REST API
    * When developing your React application, you'll be using the create-react-app development server, which will host your application (by default) at http://localhost:3000/. Your REST API, will be hosted separately from your React application at http://localhost:5000/. While both the React and REST API applications will be using the same hostname, localhost, their port numbers differ, so the browser will treat them as separate origins or domains.
    * To successfully make a request from the React application's domain to the REST API's domain, you'll need to update your REST API application to support cross-origin resource sharing or CORS (see this page on MDN for more information about CORS).
    * Add a middleware function to set the appropriate headers to support CORS.
    * Alternatively, you can install and configure the cors npm package (https://www.npmjs.com/package/cors).

4. (!PROBLEM!) Test calling your REST API from your React application
    * Before going any further, let's ensure that your React and REST API applications are setup correctly and you can successfully call your REST API from your React application.
    * Update the React App component (src/App.js file) to call the REST API to get a list of courses and render the results.
        - We're just confirming the setup of the applications, so just render the list of course titles using some simple markup (e.g. an unordered list or set of divs).
    * Open a terminal or command window and start your REST API application.
        - Browse to the api folder and run the command npm start.
        - Once you've started the REST API application, you can typically just leave the app running in the background.
    * Open another terminal or command window and start your React application.
        - Browse to the client folder and run the command npm start.
        - The create-react-app development server should start and open your application into your default browser. If the development server started but it didn't open in the browser, try manually browsing to it at http://localhost:3000/.

5. Build your app components

6. Set up your routes

7. Add support for user authentication

8. Configure your protected routes

9. Restrict access to updating and deleting courses

10. Update the "Sign Up", "Create Course", and "Update Course" screens to display validation errors  returned from the REST API.
See the create-course.html file in the markup project files folder.

11. Add support for rendering markdown formatted text

12. Add HTML and CSS

13. Add good code comments

14. Cross-Browser consistency:

15. Review the "How you'll be graded" section.

16. Quality Assurance and Project Submission Checklist




