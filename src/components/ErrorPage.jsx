import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  });

  return <p>123</p>;
}

export default ErrorPage;
