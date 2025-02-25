import { useContext, useState } from "react";
import ChatsAndGroupsComponent from "./ChatsAndGroupsComponent";
import FetchUsers from "./api/FetchUsers";
import { UserContext } from "../contexts/UsersContext";

function ChatsWrapper() {
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

    const fetchUser = await fetchUsersBySearching.json();

    setUsers(fetchUser);
  }

  return (
    <div>
      {!toggleBetweenChatAndUsers ? (
        <ChatsAndGroupsComponent
          headerName={"Chats"}
          chatsAndGroupContent={"Currently you have no conversations"}
          onClick={toggleChatsAndUsers}
        />
      ) : (
        <FetchUsers onClick={toggleChatsAndUsers} onChange={searchForUsers} />
      )}
    </div>
  );
}

export default ChatsWrapper;
