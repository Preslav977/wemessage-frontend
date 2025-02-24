import { useState } from "react";
import ChatsAndGroupsComponent from "./ChatsAndGroupsComponent";

function ChatsWrapper() {
  const [state, setState] = useState(false);

  function toggle() {
    setState(!state);
  }

  return (
    <div>
      {state ? (
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
