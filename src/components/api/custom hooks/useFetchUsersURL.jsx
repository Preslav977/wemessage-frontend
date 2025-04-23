import { useContext, useState } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import { useEffect } from "react";

import localhostURL from "../../../utility/localhostURL";

const useFetchUsersURL = () => {
  const [users, setUsers] = useContext(UsersContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${localhostURL}/users/all`, {
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
      .then((response) => setUsers(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setUsers]);

  return { users, error, loading };
};

export default useFetchUsersURL;
