import styles from "./RenderChatDetailsMessages.module.css";
import useFetchSingleChatURL from "./api/custom hooks/useFetchSingleChatURL";
import { Link } from "react-router-dom";
import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext, useState } from "react";

function RenderChatDetailsMessages({ renderChatsOrChatDetails }) {
  const { chatDetails, setChatDetails, error, loading } =
    useFetchSingleChatURL();

  console.log(chatDetails);

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  const [sendAMessage, setSendAMessage] = useState("");

  async function sendMessageInChat(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    try {
      const response = await fetch(
        `http://localhost:5000/chats/${chatDetails.id}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            message_text: getMessageTextFormData,
            id: userLogInObj.id,
          }),
        },
      );
      const result = await response.json();

      const sendMessageObj = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(sendMessageObj);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendImageInChat(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        `http://localhost:5000/chats/${chatDetails.id}/image`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        },
      );

      const result = await response.json();

      const sendImageObj = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(sendImageObj);
    } catch (err) {
      console.log(err);
    }
  }

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
                    {message.message_text ? (
                      <p>{message.message_text}</p>
                    ) : (
                      <img
                        style={{
                          width: "22rem",
                        }}
                        src={message.message_imageURL}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <div className={styles.test}>
                      {"@" + chatDetails.user.username}
                    </div>
                    <div className={styles.message1}>
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
                      <p>{message.message_text}</p>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
        )}
        <hr />
        <div className={styles.sendMessageInput}>
          {sendAMessage !== "" ? (
            <form onSubmit={sendMessageInChat}>
              <input
                style={{
                  width: "92%",
                }}
                type="text"
                name="message_text"
                id="message_text"
                value={sendAMessage}
                onChange={(e) => setSendAMessage(e.target.value)}
              />
              <input
                style={{
                  width: "50px",
                }}
                type="file"
                name="file"
                id="file"
              />
              <button
                style={{
                  width: "50px",
                }}
                type="submit"
              >
                Send
              </button>
            </form>
          ) : (
            <form onSubmit={sendImageInChat}>
              <input
                style={{
                  width: "92%",
                }}
                type="text"
                name="message_text"
                id="message_text"
                value={sendAMessage}
                onChange={(e) => setSendAMessage(e.target.value)}
              />
              <input
                style={{
                  width: "50px",
                }}
                type="file"
                name="file"
                id="file"
              />
              <button
                style={{
                  width: "50px",
                }}
                type="submit"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default RenderChatDetailsMessages;
