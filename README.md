# wemessage-frontend

![Image](https://github.com/user-attachments/assets/47d04a0c-4458-4474-9219-f223d9b22ff3)

# Overview

This is the front end of the WeMessage application, whose interface includes all information related to the user, about the chats, groups, global chats, etc. Created with PostgreSQL, Express, React, and Node

# About the project the project

WeMessage is a messaging application that allows users to update their information, start a conversation with another user, send messages or images, create groups with more users, send messages or images, and use GlobalChat, which contains all users that can send messages or images between them.

# Live Preview

- [View the live site here](https://wemessage-frontend-git-main-preslav977s-projects.vercel.app/login)
- [View the back-end API repository here](https://github.com/Preslav977/wemessage-backend)

# Features

- Live validation
- The user can update their background image
- The user can update their profile image
- The user can update their information
- The user can update their password
- The user can see their online presence when they log in or log out
- A user can start a conversation with another user
- The user can type to search for another user
- A user can send messages to another user
- A user can send an image to another user
- The user can edit their message
- The user can delete their message or image
- The user can create a group by selecting the user they had a conversation with
- In the group, you can send a message or image, edit their message, and delete their message
- Only admins for now can update the group name and delete the group
- globalChat that has all the users that you can send a message or image to, edit your message, or delete it

# Technology Used

- React: for creating all the components for the application
- React Router: defining all paths for the component, including ErrorPage when the route doesn't match the path, the point of the router is to make the application behave like a single-page application.
- Date-fns: library for formatting the dates
- PropTypes: library for validating the props of the components
- ReactTestingLibrary: library for creating tests for each component
- MSW: creating mocks to the server in order to prevent sending requests to the server

# Lessons Learned

- Learned how to create a popup modal that shows it when the user logs in with invalid credentials, the token is expired, the user edits a message, the user deletes a message, etc.
- Learned that when using a custom hook, the time is reduced to fetch instead of fetching directly in the component.
- Learned that you can use setTimeout to reset the state, but that is not an ideal solution.
- Learned that using the array method some is a good way to check if the user is in a group or not.
- Learned that when you are using enctype set to multipart/form, there is a need to use new FormData to upload an image; you can append fields to the body instead.
- Learned how to use the useRef hook to rotate an SVG
- Learned how to render the login form for each route in the router to prevent the user from accessing certain components.
- Learned how to use props to render different components and on certain screen sizes, even though the logic is repeatable.
- Learned also that you can use props to select an anchor from the nav menu.
- Learned that you pass components as props inside another component.
- Learned how to create a function to get the screen width and saved it in a state
- Learned how to filter a user by first name, last name, and username in a function using split and some array methods.
- Learned how to disable input and buttons for users with a role of guest
- Learned how to send mocks to the server without interfering with the server
- Learned how to use props to render different components and on certain screen sizes, even though the logic is repeatable
- Learned also that you can use props to select an anchor from the nav menu

# Future Improvements

- Implementing live updates for the application
- Figuring out how MSW works in order to prevent some of the tests from failing when all the tests are running
- Semantics to prevent using too many divs in some places
- Improving the accessibility
- Reducing the duplication of some components
- Reducing the ternary statements
- Figuring out how to send an image without using the submit button
- Figuring out how to use blob in order to show a preview of the image
- Figuring out how to use animations to show smooth behavior of a popup modal that is also staying in one place and, after a click, to hide it
- Better fetch logic to prevent checking if the component is null or undefined
- Way to show an error when typing until the requirements of that field are met, then showing a green tick
- Need to figure out how to send an image and message at the same time.
- How to reset a boolean state without using setTimeout
