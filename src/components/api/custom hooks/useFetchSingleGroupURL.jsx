import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GroupDetailsContext } from "../../../contexts/GroupsContext";

const useFetchSingleGroupURL = () => {
  const { id } = useParams();

  const [groupDetails, setGroupDetails] = useContext(GroupDetailsContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/groups/${id}`, {
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
      .then((response) => setGroupDetails(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id, setGroupDetails]);

  return { groupDetails, setGroupDetails, error, loading, setLoading };
};

export default useFetchSingleGroupURL;
