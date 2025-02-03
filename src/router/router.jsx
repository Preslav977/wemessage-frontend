import { createBrowserRouter } from "react-router-dom";
import LogInFormComponent from "../components/LogInFormComponent";

import App from "../App";

import SignUpFormComponent from "../components/SignUpFormComponent";
import MainAppGridComponent from "../components/MainAppGridComponent";
import ManageUserProfileComponent from "../components/ManageUserProfileComponent";

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
            left={<ManageUserProfileComponent />}
            right={<p>123</p>}
          ></MainAppGridComponent>
        ),
      },
    ],
  },
]);

export default router;
