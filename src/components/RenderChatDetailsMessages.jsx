import styles from "./RenderChatDetailsMessages.module.css";
import useFetchSingleChatURL from "./api/custom hooks/useFetchSingleChatURL";
import { Link } from "react-router-dom";
import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext, useState, useRef } from "react";
import PropTypes from "prop-types";

function RenderChatDetailsMessages({ renderChatsOrChatDetails }) {
  const { chatDetails, setChatDetails, error, loading } =
    useFetchSingleChatURL();

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  const [sendAMessageState, setSendAMessageState] = useState("");

  const [editTheSelectedMessage, setEditTheSelectedMessage] = useState();

  const dropDownFormRef = useRef(null);

  const [showDropDownMenuMessage, setShowDropDownMenuMessage] = useState(false);

  const [showDropDownMessageForm, setShowDropDownMessageForm] = useState(false);

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
    setEditTheSelectedMessage(message.message_text);

    if (clickedMessage !== undefined) {
      setClickedMessage(message.id);
    }
  }

  async function showEditMessageForm(e) {
    e.preventDefault();

    setShowDropDownMenuMessage(false);

    setShowDropDownMessageForm(true);

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    console.log(getMessageTextFormData);

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

      console.log(result);

      const editAMessage = {
        ...chatDetails,
        messages: result.messages,
      };

      console.log(chatDetails);

      setChatDetails(editAMessage);

      setShowDropDownMessageForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeMessageFromChat(message) {
    const removeMessage = {
      ...chatDetails,
      messages: chatDetails.messages.filter((msg) => msg.id !== message.id),
    };

    setChatDetails(removeMessage);

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
      <div className={styles.chatMessagesDetailsContainer}>
        <header className={styles.chatMessageDetailsHeader}>
          <Link
            className={styles.chatMessageDetailsFlexedAnchor}
            to={`/profile/${chatDetails.id}`}
          >
            {chatDetails.user.profile_picture === "" ? (
              <img
                className={styles.chatDetailsUserProfilePicture}
                src="/default_users_pfp.jpg"
                alt="default user profile picture"
              />
            ) : (
              <img
                className={styles.chatDetailsUserProfilePicture}
                src={chatDetails.user.profile_picture}
                alt="user profile picture"
              />
            )}
            <h6 className={styles.chatMessageDetailsUserFirstAndLastName}>
              {chatDetails.user.first_name} {chatDetails.user.last_name}
            </h6>
          </Link>
        </header>
        <div className={styles.chatMessageDetailsTopHr}>
          <hr />
        </div>
        {chatDetails.messages.length === 0 ? (
          <div className={styles.chatNoMessagesContainer}>
            <p>Start a conversation, say Hi!</p>
          </div>
        ) : (
          <div className={styles.chatDetailsMessagesContainer}>
            {chatDetails.messages.map((message) => (
              <>
                {message.userId === userLogInObj.id ? (
                  <ul className={styles.chatDetailsUserMessage}>
                    {message.message_text ? (
                      <div className={styles.chatDetailsMessageDropDownMenu}>
                        <img
                          className={styles.chatDetailsMessageDropDownImg}
                          onClick={() => toggleMessageDropDown(message)}
                          src="/three_dots.svg"
                          alt="message drop-down menu"
                        />
                        {showDropDownMessageForm &&
                        message.id === clickedMessage ? (
                          <form
                            style={{
                              display: "block",
                            }}
                            ref={dropDownFormRef}
                            onSubmit={showEditMessageForm}
                          >
                            <input
                              type="text"
                              name="message_text"
                              id="message_text"
                              value={editTheSelectedMessage}
                              onChange={(e) =>
                                setEditTheSelectedMessage(e.target.value)
                              }
                            />
                            <button
                              onClick={() => {
                                setShowDropDownMenuMessage(false);
                                setShowDropDownMessageForm(false);
                              }}
                            >
                              Cancel
                            </button>
                            <button type="submit">Save</button>
                          </form>
                        ) : (
                          <li className={styles.chatDetailsSendMessage}>
                            {message.message_text}
                          </li>
                        )}
                        {showDropDownMenuMessage ? (
                          <div
                            className={styles.chatDetailsDropDownMenuButtons}
                          >
                            <button
                              onClick={() => {
                                setShowDropDownMessageForm(true);
                                setShowDropDownMenuMessage(false);
                              }}
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
                        className={styles.chatDetailsSendImage}
                        src={message.message_imageURL}
                        alt="send image in chat"
                      />
                    )}
                  </ul>
                ) : (
                  <>
                    <div className={styles.chatDetailsUserUsername}>
                      <p>{"@" + chatDetails.user.username}</p>
                    </div>
                    <div className={styles.chatDetailsReceiverUserMessages}>
                      <Link to={`/profile/${chatDetails.user.id}`}>
                        {chatDetails.user.profile_picture === "" ? (
                          <img
                            className={
                              styles.chatDetailsUserDefaultProfilePicture
                            }
                            src="/default_users_pfp.jpg"
                            alt="default user profile picture"
                          />
                        ) : (
                          <img
                            src={chatDetails.user.profile_picture}
                            alt="user profile picture"
                          />
                        )}
                      </Link>
                      <p className={styles.chatDetailsSendMessage}>
                        {message.message_text}
                      </p>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
        )}
        <div className={styles.chatMessageDetailsBottomHr}>
          <hr />
        </div>
        <div className={styles.chatDetailsSendMessageOrImageContainer}>
          {sendAMessageState !== "" ? (
            <form onSubmit={sendMessageInChat}>
              <input
                className={styles.chatDetailsSendMessageInput}
                type="text"
                name="message_text"
                id="message_text"
                value={sendAMessageState}
                onChange={(e) => setSendAMessageState(e.target.value)}
              />
              <input
                className={styles.chatDetailsSendImageInput}
                type="file"
                name="file"
                id="file"
              />
              <button
                className={styles.chatDetailsSendMessageOrImageButton}
                type="submit"
              >
                Send
              </button>
            </form>
          ) : (
            <form onSubmit={sendImageInChat}>
              <input
                className={styles.chatDetailsSendMessageInput}
                type="text"
                name="message_text"
                id="message_text"
                value={sendAMessageState}
                onChange={(e) => setSendAMessageState(e.target.value)}
              />
              <input
                className={styles.chatDetailsSendImageInput}
                type="file"
                name="file"
                id="file"
              />
              <button
                className={styles.chatDetailsSendMessageOrImageButton}
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

RenderChatDetailsMessages.propTypes = {
  renderChatsOrChatDetails: PropTypes.bool,
};

export default RenderChatDetailsMessages;
