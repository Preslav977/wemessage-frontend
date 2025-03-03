import { ChatsContext } from "../contexts/ChatsContext";

function RenderChatOrGroupMessagesComponent({ renderChatOrGroupHeader }) {
  return (
    <div>
      <header>
        <img src="" alt="" />
        <h6>{renderChatOrGroupHeader}</h6>
      </header>
      <hr />
      <div></div>
    </div>
  );
}

export default RenderChatOrGroupMessagesComponent;
