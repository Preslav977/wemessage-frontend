import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserLoggedInGetByIdContext } from "../../../contexts/UserLoggedInContext";

const useUserURL = () => {
  const { id } = useParams();

  const [userGetById, setUserGetById] = useContext(UserLoggedInGetByIdContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((response) => setUserGetById(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id, setUserGetById]);

  return { userGetById, error, loading };
};

export default useUserURL;
