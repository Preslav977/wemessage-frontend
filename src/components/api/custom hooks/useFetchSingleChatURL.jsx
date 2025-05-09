import { useContext, useState, useEffect } from "react";
import { ChatDetailsContext } from "../../../contexts/ChatsContext";
import { useParams } from "react-router-dom";

import localhostURL from "../../../utility/localhostURL";

const useFetchSingleChatURL = () => {
  const { id } = useParams();

  const [chatDetails, setChatDetails] = useContext(ChatDetailsContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${localhostURL}/chats/${id}`, {
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
      .then((response) => setChatDetails(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id, setChatDetails]);

  return { chatDetails, setChatDetails, error, loading };
};

export default useFetchSingleChatURL;
