import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import SignUpFormComponent from "../components/SignUpFormComponent";

const router = createBrowserRouter([{ path: "/", element: <App /> }]);

export default router;
