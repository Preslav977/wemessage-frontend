import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h4>Oops!</h4>
      <p>Sorry, an unexpected error has occurred!</p>
    </div>
  );
}

export default ErrorPage;
