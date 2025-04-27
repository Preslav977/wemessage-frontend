import PropTypes from "prop-types";
import { UserLoggedInContext } from "../../contexts/UserLoggedInContext";
import LogInForm from "../LogInForm/LogInForm";
import { useContext } from "react";

const ProtectedAppRoute = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserLoggedInContext);

  if (!isUserLoggedIn || UserLoggedInContext === null) {
    return <LogInForm />;
  } else {
    return children;
  }
};

ProtectedAppRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedAppRoute;
