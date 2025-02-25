import { useState } from "react";
import ChatsAndGroupsComponent from "./ChatsAndGroupsComponent";

function ChatsWrapper() {
  const [toggleBetweenChatAndUsers, setToggleBetweenChatAndUsers] =
    useState(false);

  function toggle() {
    setToggleBetweenChatAndUsers(!toggleBetweenChatAndUsers);
  }

  return (
    <div>
      {!toggleBetweenChatAndUsers ? (
        <ChatsAndGroupsComponent
          headerName={"Chats"}
          chatsAndGroupContent={"Currently you have no conversations"}
          onClick={toggle}
        />
      ) : (
        <img onClick={toggle} src="/open.svg" alt=""></img>
      )}
    </div>
  );
}

export default ChatsWrapper;
