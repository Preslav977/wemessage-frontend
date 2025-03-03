import RenderChatOrGroupMessagesComponent from "./RenderChatOrGroupMessagesComponent";
import useChatURL from "./api/custom hooks/useChatURL";

function MessageChatOrGroupParent() {
  const { chatDetails, error, loading } = useChatURL();

  console.log(chatDetails);

  return (
    <>
      <RenderChatOrGroupMessagesComponent
        renderChatOrGroupHeader={"preslaw1"}
      />
    </>
  );
}

export default MessageChatOrGroupParent;
