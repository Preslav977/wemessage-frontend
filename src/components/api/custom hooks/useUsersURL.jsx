import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UsersContext";
import { useEffect } from "react";

const useUsersURL = () => {
  const [users, setUsers] = useContext(UserContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((response) => setUsers(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setUsers]);

  return { users, error, loading };
};

export default useUsersURL;
