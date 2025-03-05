import useFetchSingleChatURL from "./api/custom hooks/useFetchSingleChatURL";
import { useState, useContext, useEffect } from "react";
import { ChatDetailsContext } from "../contexts/ChatsContext";
import { useParams } from "react-router-dom";

function RenderChatDetailsMessages({ renderChatsOrChatDetails }) {
  const { chatDetails, error, loading } = useFetchSingleChatURL();

  console.log(chatDetails);

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  //   console.log(chatDetails);

  if (!renderChatsOrChatDetails) {
    return <h5>Chats</h5>;
  } else {
    return (
      <>
        <img src={chatDetails.user.profile_picture} alt="" />
        <h5>
          {chatDetails.user.first_name} {chatDetails.user.last_name}
        </h5>
        <hr />
        {chatDetails.messages.length === 0 ? (
          <p>Start a conversation, say Hi!</p>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default RenderChatDetailsMessages;
