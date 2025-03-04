import { useContext } from "react";
import { UserLoggedInContext } from "../../contexts/UserLoggedInContext";
import LogInForm from "../LogInForm/LogInForm";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserLoggedInContext);

  if (!isUserLoggedIn) {
    return <LogInForm />;
  } else {
    return children;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
