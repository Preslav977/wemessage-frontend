import styles from "./RenderChatDetailsMessages.module.css";
import useFetchSingleChatURL from "./api/custom hooks/useFetchSingleChatURL";
import { Link } from "react-router-dom";
import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext } from "react";

function RenderChatDetailsMessages({ renderChatsOrChatDetails }) {
  const { chatDetails, error, loading } = useFetchSingleChatURL();

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  if (!renderChatsOrChatDetails) {
    return <h5>Chats</h5>;
  } else if (renderChatsOrChatDetails && chatDetails !== null) {
    return (
      <div className={styles.chatDetailsContainer}>
        <div className={styles.chatDetailsUserContainer}>
          <Link
            className={styles.chatFlexedAnchor}
            to={`/profile/${chatDetails.id}`}
          >
            {chatDetails.user.profile_picture === "" ? (
              <img
                style={{
                  width: "40px",
                }}
                src="/default_users_pfp.jpg"
                alt=""
              />
            ) : (
              <img src={chatDetails.user.profile_picture} />
            )}
            <h5 className={styles.test}>
              {chatDetails.user.first_name} {chatDetails.user.last_name}
            </h5>
          </Link>
        </div>
        <hr />
        {chatDetails.messages.length === 0 && chatDetails === null ? (
          <p>Start a conversation, say Hi!</p>
        ) : (
          <div className={styles.messageContainer}>
            {chatDetails.messages.map((message) => (
              <>
                {message.userId === userLogInObj.id ? (
                  <div className={styles.message}>
                    <p>{message.message_text}</p>
                  </div>
                ) : (
                  <div className={styles.message1}>
                    <p>{message.message_text}</p>
                  </div>
                )}
              </>
            ))}
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
