import { useContext, useState } from "react";
import RenderChatsOrGroupsComponent from "./RenderChatsOrGroupsComponent";
import FetchUsers from "./api/FetchUsers";
import { UserContext } from "../contexts/UsersContext";

function ChatsParentComponent() {
  const [users, setUsers] = useContext(UserContext);

  const [toggleBetweenChatAndUsers, setToggleBetweenChatAndUsers] =
    useState(false);

  function toggleChatsAndUsers() {
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

    setUsers(getFoundUser);
  }

  return (
    <div>
      {!toggleBetweenChatAndUsers ? (
        <RenderChatsOrGroupsComponent
          showChatOrGroupHeader={"Chats"}
          onClick={toggleChatsAndUsers}
          renderChatOrGroup={false}
        />
      ) : (
        <FetchUsers onClick={toggleChatsAndUsers} onChange={searchForUsers} />
      )}
    </div>
  );
}

export default ChatsParentComponent;
