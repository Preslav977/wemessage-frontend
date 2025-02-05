import { createBrowserRouter } from "react-router-dom";
import LogInFormComponent from "../components/LogInFormComponent";

import App from "../App";

import SignUpFormComponent from "../components/SignUpFormComponent";
import MainAppGridComponent from "../components/MainAppGridComponent";
import ManageUserProfileComponent from "../components/ManageUserProfileComponent";
import UserProfileComponent from "../components/UserProfileComponent";
import EditUserProfileComponent from "../components/EditUserProfileComponent";
import ChangeUserProfilePasswords from "../components/ChangeUserProfilePasswords";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <LogInFormComponent /> },
      { path: "/signup", element: <SignUpFormComponent /> },
      {
        path: "/profile/:id",
        element: (
          <MainAppGridComponent
            mainGridSectionContent={<ManageUserProfileComponent />}
            secondaryGridSectionContent={<UserProfileComponent />}
          ></MainAppGridComponent>
        ),
      },
      {
        path: "/profile/edit/:id",
        element: (
          <MainAppGridComponent
            mainGridSectionContent={<ManageUserProfileComponent />}
            secondaryGridSectionContent={<EditUserProfileComponent />}
          ></MainAppGridComponent>
        ),
      },
      {
        path: "/profile/change_passwords/:id",
        element: (
          <MainAppGridComponent
            mainGridSectionContent={<ManageUserProfileComponent />}
            secondaryGridSectionContent={<ChangeUserProfilePasswords />}
          ></MainAppGridComponent>
        ),
      },
    ],
  },
]);

export default router;
