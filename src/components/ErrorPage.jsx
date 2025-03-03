import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 3000);
  // });

  return (
    <div>
      <h4>Oops!</h4>
      <p>Sorry, an unexpected error has occurred!</p>
      <p>{error.statusText || error.message}</p>
      <p>You will be redirected to login form in 3 seconds!</p>
    </div>
  );
}

export default ErrorPage;
