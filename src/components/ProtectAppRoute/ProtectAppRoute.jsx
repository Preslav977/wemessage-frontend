import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedAppRoute = ({ children }) => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/login");
  }, 1000);

  return <>{children}</>;
};

ProtectedAppRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedAppRoute;
