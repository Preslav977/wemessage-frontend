import { useContext, useState, useEffect } from "react";
import { ChatsContext } from "../../../contexts/ChatsContext";

const useFetchChatsURL = () => {
  const [chats, setChats] = useContext(ChatsContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/chats`, {
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
      .then((response) => setChats(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setChats]);

  return { chats, error, loading };
};

export default useFetchChatsURL;
