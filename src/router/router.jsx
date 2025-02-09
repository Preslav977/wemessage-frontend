import { createBrowserRouter, useActionData } from "react-router-dom";

import App from "../App";

import SignUpForm from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";
import MainGridInterface from "../components/MainGridInterface";
import ManageUserProfile from "../components/ManageUserProfile";
import UserProfile from "../components/UserProfile";
import EditUserProfile from "../components/EditUserProfile";
import ChangeUserProfilePasswords from "../components/ChangeUserProfilePasswords";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <LogInForm /> },
      { path: "/signup", element: <SignUpForm /> },
      {
        path: "/profile/:id",
        element: (
          <MainGridInterface
            leftGridComponent={<ManageUserProfile />}
            rightGridComponent={<UserProfile />}
          ></MainGridInterface>
        ),
      },
      {
        path: "/profile/edit/:id",
        element: (
          <MainGridInterface
            leftGridComponent={<ManageUserProfile />}
            rightGridComponent={<EditUserProfile />}
          ></MainGridInterface>
        ),
      },
      {
        path: "/profile/change_passwords/:id",
        element: (
          <MainGridInterface
            leftGridComponent={<ManageUserProfile />}
            rightGridComponent={<ChangeUserProfilePasswords />}
          ></MainGridInterface>
        ),
      },
    ],
  },
]);

export default router;
