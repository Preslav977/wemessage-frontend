import App from "../App";

import LogInFormComponent from "../components/LogInFormComponent";
import SignUpFormComponent from "../components/SignUpFormComponent";
import MainAppGridComponent from "../components/MainAppGridComponent";
import ManageUserProfileComponent from "../components/ManageUserProfileComponent";

const routes = [
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
];

export default routes;
