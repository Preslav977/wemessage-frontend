import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import SignUpForm from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";
import MainGridInterface from "../components/MainGridInterface";
import ManageUserProfile from "../components/ManageUserProfile";
import UserProfile from "../components/UserProfile";
import EditUserProfile from "../components/EditUserProfile";
import ChangeUserProfilePasswords from "../components/ChangeUserProfilePasswords";

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
            mainGridSectionContent={<ManageUserProfile />}
            secondaryGridSectionContent={<UserProfile />}
          ></MainGridInterface>
        ),
      },
      {
        path: "/profile/edit/:id",
        element: (
          <MainGridInterface
            mainGridSectionContent={<ManageUserProfile />}
            secondaryGridSectionContent={<EditUserProfile />}
          ></MainGridInterface>
        ),
      },
      {
        path: "/profile/change_passwords/:id",
        element: (
          <MainGridInterface
            mainGridSectionContent={<ManageUserProfile />}
            secondaryGridSectionContent={<ChangeUserProfilePasswords />}
          ></MainGridInterface>
        ),
      },
    ],
  },
]);

export default router;
