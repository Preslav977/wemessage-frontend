import styles from "./RenderChatDetailsMessages.module.css";
import { Link } from "react-router-dom";
import { useContext, useState, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import useFetchSingleChatURL from "../api/custom hooks/useFetchSingleChatURL";
import { format } from "date-fns";

function RenderChatDetailsMessages() {
  const { chatDetails, setChatDetails, error, loading } =
    useFetchSingleChatURL();

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  // this state will be used a condition to send a message or image in the form
  const [sendAMessageState, setSendAMessageState] = useState("");

  //this state will selected the clicked message in the array
  const [editTheSelectedMessage, setEditTheSelectedMessage] = useState();

  //this will show or hide the drop-down menu
  const dropDownMenuRef = useRef(null);

  //this state will render the drop-down menu when is true
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  //this state will render the input or textarea to edit the message
  const [showDropDownFormOnMessage, setShowDropDownFormOnMessage] =
    useState(false);

  const [clickedMessage, setClickedMessage] = useState();

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>Failed to fetch chat details!</p>;
  }

  async function sendMessageInChat(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    setSendAMessageState("");

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
            senderMessageId: userLogInObj.id,
            receiverId: chatDetails.receiverChat.id,
          }),
        },
      );
      const result = await response.json();

      // console.log(result);

      const sendMessageObj = {
        ...chatDetails,
        messages: result.messages,
      };

      console.log(chatDetails);

      setChatDetails(sendMessageObj);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendImageInChat(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append("senderMessageId", userLogInObj.id);

    formData.append("receiverId", chatDetails.receiverChat.id);

    setSendAMessageState("");

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

      console.log(result);

      const sendImageObj = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(sendImageObj);
    } catch (err) {
      console.log(err);
    }
  }

  //function that gets the current clicked message
  //then renders the drop-down menu
  //edits the message and hides the drop-down
  function toggleMessageDropDown(message) {
    setClickedMessage(message.id);
    setShowDropDownMenu(true);
    setEditTheSelectedMessage(message.message_text);

    //since the state is undefined check if is not
    //then get the messageID
    if (clickedMessage !== undefined) {
      setClickedMessage(message.id);
    }
  }

  async function showEditMessageForm(e) {
    e.preventDefault();

    setShowDropDownMenu(false);

    setShowDropDownFormOnMessage(true);

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    console.log(getMessageTextFormData);

    setSendAMessageState("");

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
            senderMessageId: userLogInObj.id,
            receiverMessageId: chatDetails.receiverChat.id,
          }),
        },
      );

      const result = await response.json();

      // console.log(result);

      const editAMessage = {
        ...chatDetails,
        messages: result.messages,
      };

      // console.log(chatDetails);

      setChatDetails(editAMessage);

      setShowDropDownFormOnMessage(false);
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
          body: JSON.stringify({
            senderMessageId: userLogInObj.id,
          }),
        },
      );

      const result = await response.json();

      // console.log(result)

      const retrieveNewMessagesAfterDeletingAMessage = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(retrieveNewMessagesAfterDeletingAMessage);
    } catch (err) {
      console.log(err);
    }
  }

  if (chatDetails === null) {
    return <h5>Chats</h5>;
  } else {
    return (
      <div className={styles.chatMessagesDetailsContainer}>
        <header className={styles.chatMessageDetailsHeader}>
          <Link
            className={styles.chatMessageDetailsFlexedAnchor}
            to={`/profile/${chatDetails.id}`}
          >
            {chatDetails.receiverChat.profile_picture === "" ? (
              <img
                className={styles.chatDetailsUserProfilePicture}
                src="/default_users_pfp.jpg"
                alt="user default profile picture"
              />
            ) : (
              <img
                className={styles.chatDetailsUserProfilePicture}
                src={chatDetails.receiverChat.profile_picture}
                alt="user profile picture"
              />
            )}
            <h6 className={styles.chatMessageDetailsUserFirstAndLastName}>
              {chatDetails.receiverChat.first_name}{" "}
              {chatDetails.receiverChat.last_name}
            </h6>
          </Link>
        </header>

        {chatDetails.messages.length === 0 ? (
          <div className={styles.chatNoMessagesContainer}>
            <p>Start a conversation, say Hi!</p>
          </div>
        ) : (
          <ul className={styles.chatDetailsMessagesContainer}>
            {chatDetails.messages.map((message) => (
              <Fragment key={message.id}>
                {/* if the messageId equal the loggedIn userId render the message of that user  */}
                {message.senderMessageId === userLogInObj.id ? (
                  <li
                    // key={message.id}
                    className={styles.chatDetailsUserMessage}
                  >
                    {message.message_text ? (
                      <div className={styles.chatDetailsMessageDropDownMenu}>
                        <img
                          className={styles.chatDetailsMessageDropDownImg}
                          onClick={() => toggleMessageDropDown(message)}
                          src="/three_dots.svg"
                          alt="message drop-down menu"
                        />
                        {showDropDownFormOnMessage &&
                        message.id === clickedMessage ? (
                          <form
                            style={{
                              display: "block",
                            }}
                            ref={dropDownMenuRef}
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
                                setShowDropDownMenu(false);
                                setShowDropDownFormOnMessage(false);
                              }}
                            >
                              Cancel
                            </button>
                            <button type="submit">Save</button>
                          </form>
                        ) : (
                          <li
                            key={message.id}
                            className={styles.chatDetailsSendMessage}
                          >
                            {message.message_text}
                          </li>
                        )}
                        {showDropDownMenu ? (
                          <div
                            className={styles.chatDetailsDropDownMenuButtons}
                          >
                            <button
                              onClick={() => {
                                setShowDropDownFormOnMessage(true);
                                setShowDropDownMenu(false);
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
                      <>
                        {message.senderMessageId === userLogInObj.id ? (
                          <div
                            className={styles.chatDetailsMessageDropDownMenu}
                          >
                            <img
                              className={styles.chatDetailsMessageDropDownImg}
                              onClick={() => toggleMessageDropDown(message)}
                              src="/three_dots.svg"
                              alt="message drop-down menu"
                            />
                            <img
                              key={message.id}
                              className={styles.chatDetailsSendImage}
                              src={message.message_imageURL}
                              alt="send image in chat"
                            />
                          </div>
                        ) : (
                          <img
                            key={message.id}
                            className={styles.chatDetailsSendImage}
                            src={message.message_imageURL}
                            alt="send image in chat"
                          />
                        )}
                      </>
                    )}
                  </li>
                ) : (
                  <>
                    <div
                      className={styles.chatReceiverSendingMessagesContainer}
                    >
                      <div className={styles.chatDetailsUserUsername}>
                        <p>{"@" + chatDetails.senderChat.username}</p>
                      </div>
                      <div className={styles.chatDetailsReceiverUserMessages}>
                        <Link to={`/profile/${chatDetails.senderChat.id}`}>
                          {chatDetails.senderChat.profile_picture === "" ? (
                            <img
                              className={
                                styles.chatDetailsUserDefaultProfilePicture
                              }
                              src="/default_users_pfp.jpg"
                              alt="user default profile picture"
                            />
                          ) : (
                            <img
                              src={chatDetails.senderChat.profile_picture}
                              alt="user profile picture"
                            />
                          )}
                        </Link>
                        {message.message_text ? (
                          <li className={styles.chatDetailsSendMessage}>
                            {message.message_text}
                          </li>
                        ) : (
                          <img
                            className={styles.chatDetailsSendImage}
                            src={message.message_imageURL}
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Fragment>
            ))}
          </ul>
        )}
        {/* <div className={styles.chatMessageDetailsBottomHr}>
          <hr />
        </div> */}
        <div className={styles.chatDetailsSendMessageOrImageContainer}>
          <form
            encType="multipart/form"
            onSubmit={
              sendAMessageState !== "" ? sendMessageInChat : sendImageInChat
            }
          >
            <input
              className={styles.chatDetailsSendMessageInput}
              data-testid="message_text"
              type="text"
              name="message_text"
              id="message_text"
              value={sendAMessageState}
              onChange={(e) => setSendAMessageState(e.target.value)}
            />
            <input
              className={styles.chatDetailsSendImageInput}
              data-testid="message_image"
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
        </div>
      </div>
    );
  }
}

RenderChatDetailsMessages.propTypes = {
  renderChatsOrChatDetails: PropTypes.bool,
};

export default RenderChatDetailsMessages;
