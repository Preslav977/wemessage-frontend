import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectApp({ children }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 1000);
  // });

  return <>{children}</>;
}

export default ProtectApp;
