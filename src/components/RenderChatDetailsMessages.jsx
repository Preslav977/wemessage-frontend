import styles from "./RenderChatDetailsMessages.module.css";
import useFetchSingleChatURL from "./api/custom hooks/useFetchSingleChatURL";

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
  } else if (renderChatsOrChatDetails && chatDetails !== null) {
    return (
      <div className={styles.chatDetailsContainer}>
        <div className={styles.chatDetailsUserContainer}>
          <img src={chatDetails.user.profile_picture} alt="" />
          <h5 className={styles.test}>
            {chatDetails.user.first_name} {chatDetails.user.last_name}
          </h5>
        </div>
        <hr />
        {chatDetails.messages.length === 0 ? (
          <p>Start a conversation, say Hi!</p>
        ) : (
          <div className={styles.chatDetailsMessageContainer}>
            <ul className={styles.ulMessageContainer}>
              {chatDetails.messages.map((message) => (
                <li key={message.id} className={styles.sendMessage}>
                  {message.message_text}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* <hr /> */}
        <div className={styles.sendMessageInput}>
          <input type="text" name="" id="" />
          <input type="file" name="" id="" />
          <button type="submit">Send</button>
        </div>
      </div>
    );
  }
}

export default RenderChatDetailsMessages;
