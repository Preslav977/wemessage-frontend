import { useContext, useState, useEffect } from "react";
import { GroupsContext } from "../../../contexts/GroupsContext";

const useFetchGroupsURL = () => {
  const [groups, setGroups] = useContext(GroupsContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/groups", {
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
      .then((response) => setGroups(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setGroups]);

  return { groups, error, loading };
};

export default useFetchGroupsURL;
