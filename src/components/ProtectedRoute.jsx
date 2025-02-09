import { useContext } from "react";

import { UserLoggedInContext } from "../contexts/UserLoggedInContext";
import LogInForm from "./LogInForm";

const ProtectedRoute = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserLoggedInContext);

  if (!isUserLoggedIn) {
    return <LogInForm />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
