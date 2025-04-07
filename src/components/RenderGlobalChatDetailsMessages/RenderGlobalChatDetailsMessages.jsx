import styles from "./RenderGlobalChatDetailsMessages.module.css";
import { Link } from "react-router-dom";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { useContext, useState, useRef, Fragment } from "react";
import useFetchGlobalChatURL from "../api/custom hooks/useFetchGlobalChatURL";
import { format } from "date-fns";

function RenderGlobalChatDetailsMessages() {
  const { globalChatDetails, setGlobalChatDetails, error, loading } =
    useFetchGlobalChatURL();

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  // this state will be used a condition to send a message or image in the form
  const [sendAGlobalChatMessageState, setSendAGlobalChatMessageState] =
    useState("");

  //this state will selected the clicked message in the array
  const [
    editTheSelectedGlobalChatMessage,
    setEditTheSelectedGlobalChatMessage,
  ] = useState();

  //this will show or hide the drop-down menu
  const dropDownMenuRef = useRef(null);

  const formRef = useRef(null);

  //this state will render the drop-down menu when is true
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  //this state will render the input or textarea to edit the message
  const [showDropDownFormOnMessage, setShowDropDownFormOnMessage] =
    useState(false);

  const [clickedGlobalChatMessage, setClickedGlobalChatMessage] = useState();

  if (loading) {
    return <img src="/loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>Failed to fetch globalChat details!</p>;
  }

  async function sendMessageInGlobalChat(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    setSendAGlobalChatMessageState("");

    try {
      const response = await fetch(
        `http://localhost:5000/globalChat/${globalChatDetails.id}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            message_text: getMessageTextFormData,
            userId: userLogInObj.id,
          }),
        },
      );

      const result = await response.json();

      console.log(result);

      const sendMessageObj = {
        ...globalChatDetails,
        messagesGGChat: result.messagesGGChat,
      };

      setGlobalChatDetails(sendMessageObj);

      formRef.current.reset();
    } catch (err) {
      console.log(err);
    }
  }

  async function sendImageInGlobalChat(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    setSendAGlobalChatMessageState("");

    try {
      const response = await fetch(
        `http://localhost:5000/globalChat/${globalChatDetails.id}/image`,
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
        ...globalChatDetails,
        messagesGGChat: result.messagesGGChat,
      };

      setGlobalChatDetails(sendImageObj);
    } catch (err) {
      console.log(err);
    }
  }

  //function that gets the current clicked message
  //then renders the drop-down menu
  //edits the message and hides the drop-down
  function toggleMessageDropDown(message) {
    setClickedGlobalChatMessage(message.id);
    setShowDropDownMenu(true);
    setEditTheSelectedGlobalChatMessage(message.message_text);

    if (clickedGlobalChatMessage !== undefined) {
      setClickedGlobalChatMessage(message.id);
    }
  }

  async function showEditGlobalChatMessageForm(e) {
    e.preventDefault();

    setShowDropDownMenu(false);

    setShowDropDownFormOnMessage(true);

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    console.log(getMessageTextFormData);

    setSendAGlobalChatMessageState("");

    try {
      const response = await fetch(
        `http://localhost:5000/globalChat/${globalChatDetails.id}/message/${clickedGlobalChatMessage}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            message_text: getMessageTextFormData,
            id: clickedGlobalChatMessage,
            globalChatId: globalChatDetails.id,
          }),
        },
      );

      const result = await response.json();

      console.log(result);

      const editAMessage = {
        ...globalChatDetails,
        messagesGGChat: result.messagesGGChat,
      };

      console.log(globalChatDetails);

      setGlobalChatDetails(editAMessage);

      setShowDropDownFormOnMessage(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeMessageFromGlobalChat(message) {
    const removeMessage = {
      ...globalChatDetails,
      messagesGGChat: globalChatDetails.messagesGGChat.filter(
        (msg) => msg.id !== message.id,
      ),
    };

    setGlobalChatDetails(removeMessage);

    try {
      const response = await fetch(
        `http://localhost:5000/globalChat/${globalChatDetails.id}/message/${message.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            messageId: clickedGlobalChatMessage,
            userId: userLogInObj.id,
            globalChatId: globalChatDetails.id,
          }),
        },
      );

      const result = await response.json();

      const retrieveNewMessagesAfterDeletingAMessage = {
        ...globalChatDetails,
        messagesGGChat: result.messagesGGChat,
      };

      setGlobalChatDetails(retrieveNewMessagesAfterDeletingAMessage);
    } catch (err) {
      console.log(err);
    }
  }

  if (globalChatDetails !== null) {
    return (
      <div className={styles.globalChatMessagesDetailsContainer}>
        <header className={styles.globalChatMessageDetailsHeader}>
          {/* <img
            className={styles.globalChatDetailsUserProfilePicture}
            src={globalChatDetails.globalChat_image}
            alt="globalChat image"
          /> */}
          <h6 className={styles.globalChatNameMessageDetails}>
            {"Global Chat"}
          </h6>
        </header>
        <>
          {globalChatDetails.messagesGGChat.length === 0 ? (
            <div className={styles.globalChatNoMessagesContainer}>
              <p>Start a conversation, say Hi!</p>
            </div>
          ) : (
            <ul className={styles.globalChatDetailsMessagesContainer}>
              {globalChatDetails.messagesGGChat.map((message, index) => (
                <Fragment key={message.id}>
                  {message.userId === userLogInObj.id ? (
                    <ul className={styles.globalChatDetailsUserMessage}>
                      {message.message_text ? (
                        <div
                          className={
                            styles.globalChatDetailsMessageDropDownMenu
                          }
                        >
                          <img
                            className={
                              styles.globalChatDetailsMessageDropDownImg
                            }
                            onClick={() => toggleMessageDropDown(message)}
                            src="/three_dots.svg"
                            alt="message drop-down menu"
                          />
                          {showDropDownFormOnMessage &&
                          message.id === clickedGlobalChatMessage ? (
                            <form
                              style={{
                                display: "block",
                              }}
                              ref={dropDownMenuRef}
                              onSubmit={showEditGlobalChatMessageForm}
                            >
                              <input
                                data-testid="message_text"
                                type="text"
                                name="message_text"
                                id="message_text"
                                value={editTheSelectedGlobalChatMessage}
                                onChange={(e) =>
                                  setEditTheSelectedGlobalChatMessage(
                                    e.target.value,
                                  )
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
                              className={styles.globalChatDetailsSendImage}
                              key={message.id}
                            >
                              {message.message_text}
                            </li>
                            // <div>
                            //   {index === 0 ? (
                            //     <>
                            //       <p>{format(message.createdAt, "dd/MM/yy")}</p>
                            //       <p>{message.message_text}</p>
                            //     </>
                            //   ) : (
                            //     <p>{message.message_text}</p>
                            //   )}
                            // </div>
                          )}
                          {showDropDownMenu ? (
                            <div
                              className={
                                styles.globalChatDetailsDropDownMenuButtons
                              }
                            >
                              <button
                                onClick={() => {
                                  setShowDropDownFormOnMessage(true);
                                  setShowDropDownMenu(false);
                                }}
                                style={{
                                  display:
                                    message.id === clickedGlobalChatMessage
                                      ? "block"
                                      : "none",
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  removeMessageFromGlobalChat(message)
                                }
                                style={{
                                  display:
                                    message.id === clickedGlobalChatMessage
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
                          {message.userId === userLogInObj.id ? (
                            <>
                              <div
                                className={
                                  styles.globalChatDetailsMessageDropDownMenu
                                }
                              >
                                <div
                                  className={
                                    styles.globalChatDetailsMessageDropDownButtonWrapper
                                  }
                                >
                                  <img
                                    className={
                                      styles.globalChatDetailsMessageDropDownImg
                                    }
                                    onClick={() =>
                                      toggleMessageDropDown(message)
                                    }
                                    src="/three_dots.svg"
                                    alt="message drop-down menu"
                                  />
                                  {showDropDownMenu ? (
                                    <div className={styles.btn}>
                                      <button
                                        onClick={() =>
                                          removeMessageFromGlobalChat(message)
                                        }
                                        style={{
                                          display:
                                            message.id ===
                                            clickedGlobalChatMessage
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

                                <img
                                  key={message.id}
                                  className={styles.globalChatDetailsSendImage}
                                  src={message.message_imageURL}
                                  alt="send image in chat"
                                />
                              </div>
                            </>
                          ) : (
                            <img
                              key={message.id}
                              className={styles.globalChatDetailsSendImage}
                              src={message.message_imageURL}
                              alt="send image in chat"
                            />
                          )}
                        </>
                      )}
                    </ul>
                  ) : (
                    <>
                      {globalChatDetails.users.map((user) => (
                        <Fragment key={user.id}>
                          {user.id !== userLogInObj.id ? (
                            <div
                              className={
                                styles.globalChatReceiverSendingMessagesContainer
                              }
                            >
                              <div
                                className={styles.globalChatDetailsUserUsername}
                              >
                                <p>{"@" + user.username}</p>
                              </div>
                              <div
                                className={
                                  styles.globalChatDetailsReceiverUserMessages
                                }
                              >
                                <Link to={`/profile/${user.id}`}>
                                  {user.profile_picture === "" ? (
                                    <img
                                      className={
                                        styles.globalChatDetailsUserDefaultProfilePicture
                                      }
                                      src="/default_users_pfp.jpg"
                                      alt="user default profile picture"
                                    />
                                  ) : (
                                    <img
                                      src={user.profile_picture}
                                      alt="user profile picture"
                                    />
                                  )}
                                </Link>
                                {message.message_text ? (
                                  <li
                                    key={message.id}
                                    className={
                                      styles.globalChatDetailsSendMessage
                                    }
                                  >
                                    {message.message_text}
                                  </li>
                                ) : (
                                  <img
                                    key={message.id}
                                    className={
                                      styles.globalChatDetailsSendImage
                                    }
                                    src={message.message_imageURL}
                                    alt="send image in chat"
                                  />
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </Fragment>
                      ))}
                    </>
                  )}
                </Fragment>
              ))}
            </ul>
          )}
        </>

        <div className={styles.globalChatDetailsSendMessageOrImageContainer}>
          <form
            ref={formRef}
            encType="multipart/form"
            onSubmit={
              sendAGlobalChatMessageState !== ""
                ? sendMessageInGlobalChat
                : sendImageInGlobalChat
            }
          >
            <input
              className={styles.globalChatDetailsSendMessageInput}
              data-testid="message_text"
              type="text"
              name="message_text"
              id="message_text"
              maxLength={200}
              value={sendAGlobalChatMessageState}
              onChange={(e) => setSendAGlobalChatMessageState(e.target.value)}
            />
            <input
              className={styles.globalChatDetailsSendImageInput}
              data-testid="message_image"
              type="file"
              name="file"
              id="file"
            />
            <button
              className={styles.globalChatDetailsSendMessageOrImageButton}
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

export default RenderGlobalChatDetailsMessages;
