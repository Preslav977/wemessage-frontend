import styles from "./RenderChatDetailsMessages.module.css";
import useFetchSingleChatURL from "./api/custom hooks/useFetchSingleChatURL";
import { Link } from "react-router-dom";
import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext, useState } from "react";
import { useRef } from "react";

function RenderChatDetailsMessages({ renderChatsOrChatDetails }) {
  const { chatDetails, setChatDetails, error, loading } =
    useFetchSingleChatURL();

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  const [sendAMessage, setSendAMessage] = useState("");

  const [msg, setMsg] = useState();

  const form = useRef(null);

  const [showDropDownMenuMessage, setShowDropDownMenuMessage] = useState(false);

  const [editMessageForm, setEditMessageForm] = useState(false);

  const [clickedMessage, setClickedMessage] = useState();

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

  function toggleMessageDropDown(message) {
    setClickedMessage(message.id);
    setShowDropDownMenuMessage(true);
    setMsg(message.message_text);

    if (clickedMessage !== undefined) {
      setClickedMessage(message.id);
    }
  }

  async function showEditMessageForm(e) {
    e.preventDefault();

    setEditMessageForm(true);

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    try {
      const response = await fetch(
        `http://localhost:5000/chats/${chatDetails.id}/message/${clickedMessage}`,
        {
          method: "PUT",
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

      const editAMessage = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(editAMessage);

      setEditMessageForm(false);

      setShowDropDownMenuMessage(false);
    } catch (err) {
      console.log(err);
    }
  }

  function showForm() {
    setEditMessageForm(true);
  }

  async function removeMessageFromChat(message) {
    console.log(message.id);

    const removeMessage = {
      ...chatDetails,
      messages: chatDetails.messages.filter((msg) => msg.id !== message.id),
    };

    setChatDetails(removeMessage);

    console.log(chatDetails);

    try {
      const response = await fetch(
        `http://localhost:5000/chats/${chatDetails.id}/message/${message.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      const result = await response.json();

      console.log(result);

      const retrieveNewMessagesAfterDeletingAMessage = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(retrieveNewMessagesAfterDeletingAMessage);
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
                      <div className={styles.flexMessage}>
                        <img
                          onClick={() => toggleMessageDropDown(message)}
                          style={{
                            width: "5px",
                          }}
                          src="/three_dots.svg"
                          alt=""
                        />
                        {editMessageForm && message.id === clickedMessage ? (
                          <form
                            style={{
                              display: "block",
                            }}
                            ref={form}
                            onSubmit={showEditMessageForm}
                          >
                            <input
                              type="text"
                              name="message_text"
                              id="message_text"
                              value={msg}
                              onChange={(e) => setMsg(e.target.value)}
                            />
                            <button
                              onClick={() => {
                                setShowDropDownMenuMessage(false);
                                setEditMessageForm(false);
                              }}
                            >
                              Cancel
                            </button>
                            <button type="submit">Save</button>
                          </form>
                        ) : (
                          <p className={styles.msg}>{message.message_text}</p>
                        )}
                        {showDropDownMenuMessage ? (
                          <div className={styles.buttons}>
                            <button
                              onClick={showForm}
                              style={{
                                display:
                                  message.id === clickedMessage
                                    ? "block"
                                    : "none",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeMessageFromChat(message)}
                              style={{
                                display:
                                  message.id === clickedMessage
                                    ? "block"
                                    : "none",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
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
