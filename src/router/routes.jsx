import App from "../App";

import LogInFormComponent from "../components/LogInFormComponent";
import SignUpFormComponent from "../components/SignUpFormComponent";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <LogInFormComponent /> },
      { path: "/signup", element: <SignUpFormComponent /> },
    ],
  },
];

export default routes;
