import { useContext, useState } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import FetchAndSearchForUsers from "../api/FetchAndSearchForUsers";
import PropTypes from "prop-types";
import RenderAllChats from "../RenderAllChats/RenderAllChats";

function ToggleBetweenChatsOrSearchForUser({ renderChatsOrGlobalChat }) {
  const [users, setUsers] = useContext(UsersContext);

  const [toggleBetweenChatAndUsers, setToggleBetweenChatAndUsers] =
    useState(false);

  function toggleChatsOrUsers() {
    setToggleBetweenChatAndUsers(!toggleBetweenChatAndUsers);
  }

  async function searchForUsers(e) {
    try {
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

      console.log(getFoundUser);

      setUsers(getFoundUser);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!renderChatsOrGlobalChat && !toggleBetweenChatAndUsers ? (
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

ToggleBetweenChatsOrSearchForUser.propTypes = {
  renderChatsOrGlobalChat: PropTypes.bool,
};

export default ToggleBetweenChatsOrSearchForUser;
