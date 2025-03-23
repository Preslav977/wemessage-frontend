import { useContext, useState, useEffect } from "react";
import { GlobalChatDetailsContext } from "../../../contexts/GlobalChatContext";
import { useParams } from "react-router-dom";

const useFetchGlobalChatURL = () => {
  const { id } = useParams();

  const [globalChatDetails, setGlobalChatDetails] = useContext(
    GlobalChatDetailsContext,
  );

  console.log(globalChatDetails);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/globalChat/${id}`, {
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
      .then((response) => setGlobalChatDetails(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id, setGlobalChatDetails]);

  return { globalChatDetails, setGlobalChatDetails, error, loading };
};

export default useFetchGlobalChatURL;
