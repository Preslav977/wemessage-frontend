import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedAppRoute = ({ children, currentPath }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath === "/") {
      navigate("/login");
    }
  }, [currentPath]);

  return <>{children}</>;
};

ProtectedAppRoute.propTypes = {
  children: PropTypes.object,
  currentPath: PropTypes.string,
};

export default ProtectedAppRoute;
