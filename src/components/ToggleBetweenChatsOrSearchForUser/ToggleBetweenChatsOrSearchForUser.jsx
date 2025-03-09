import { useContext, useState } from "react";
import FetchAndSearchForUsers from "../api/FetchAndSearchForUsers";
import { UserContext } from "../../contexts/UsersContext";
import RenderAllChats from "../RenderAllChats/RenderAllChats";

function ToggleBetweenChatsOrSearchForUser() {
  const [users, setUsers] = useContext(UserContext);

  const [toggleBetweenChatAndUsers, setToggleBetweenChatAndUsers] =
    useState(false);

  function toggleChatsOrUsers() {
    setToggleBetweenChatAndUsers(!toggleBetweenChatAndUsers);
  }

  async function searchForUsers(e) {
    const fetchUsersBySearching = await fetch(
      `http://localhost:5000/users/search/?query=${e.target.value}`,
      {
        mode: "cors",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    const getFoundUser = await fetchUsersBySearching.json();

    const copyArray = [...getFoundUser];

    setUsers(copyArray);
  }

  return (
    <>
      {!toggleBetweenChatAndUsers ? (
        <RenderAllChats onClick={toggleChatsOrUsers} />
      ) : (
        <FetchAndSearchForUsers
          onClick={toggleChatsOrUsers}
          onChange={searchForUsers}
        />
      )}
    </>
  );
}

export default ToggleBetweenChatsOrSearchForUser;
