import styles from "./RenderGlobalChatDetailsMessages.module.css";
import { Link } from "react-router-dom";
import { useContext, useState, useRef, Fragment } from "react";
import { format } from "date-fns";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import useFetchGlobalChatURL from "../api/custom hooks/useFetchGlobalChatURL";
import PopUpModal from "../PopUpModal/PopUpModal";

import localhostURL from "../../utility/localhostURL";

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

  const [showPopUpWhEditingMessage, setShowPopUpWhenEditingMessage] =
    useState(false);

  const [showPopUpWhDeletingMessage, setShowPopUpWhenDeletingMessage] =
    useState(false);

  const [showPopUpModalOnExpiredToken, setShowPopUpModalOnExpiredToken] =
    useState(false);

  if (loading) {
    // return <img src="/loading_spinner.svg" alt="Loading..." />;

    return (
      <svg
        version="1.1"
        id="L7"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        xmlSpace="preserve"
      >
        Loading...
        <path
          fill="#fff"
          d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="2s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
        <path
          fill="#fff"
          d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          />
        </path>
        <path
          fill="#fff"
          d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
L82,35.7z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="2s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );
  }

  if (error) {
    return (
      <p className={styles.errorParagraph}>
        Failed to fetch globalChat details!
      </p>
    );
  }

  async function sendMessageInGlobalChat(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    setSendAGlobalChatMessageState("");

    try {
      const response = await fetch(
        `${localhostURL}/globalChat/${globalChatDetails.id}/message`,
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

      if (response.status === 403) {
        setShowPopUpModalOnExpiredToken(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalOnExpiredToken(false);
        }, 3000);
      }

      const result = await response.json();

      // console.log(result);

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
        `${localhostURL}/globalChat/${globalChatDetails.id}/image`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        },
      );

      if (response.status === 403) {
        setShowPopUpModalOnExpiredToken(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalOnExpiredToken(false);
        }, 3000);
      }

      const result = await response.json();

      // console.log(result);

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

    // console.log(getMessageTextFormData);

    setSendAGlobalChatMessageState("");

    try {
      const response = await fetch(
        `${localhostURL}/globalChat/${globalChatDetails.id}/message/${clickedGlobalChatMessage}`,
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

      if (response.status === 403) {
        setShowPopUpModalOnExpiredToken(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalOnExpiredToken(false);
        }, 3000);
      }

      if (response.status === 200) {
        setShowPopUpWhenEditingMessage(true);

        setTimeout(() => {
          setShowPopUpWhenEditingMessage(false);
        }, 3000);
      }

      const result = await response.json();

      // console.log(result);

      const editAMessage = {
        ...globalChatDetails,
        messagesGGChat: result.messagesGGChat,
      };

      // console.log(globalChatDetails);

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
        `${localhostURL}/globalChat/${globalChatDetails.id}/message/${message.id}`,
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

      if (response.status === 403) {
        setShowPopUpModalOnExpiredToken(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalOnExpiredToken(false);
        }, 3000);
      }

      if (response.status === 200) {
        setShowPopUpWhenDeletingMessage(true);

        setTimeout(() => {
          setShowPopUpWhenDeletingMessage(false);
        }, 3000);
      }

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
      <>
        <div className={styles.globalChatMessagesDetailsContainer}>
          <header className={styles.globalChatMessageDetailsHeader}>
            <img
              className={styles.globalChatDetailsProfilePicture}
              src="/wemessage_logo.jpg"
              alt="globalChat image"
            />
            <h6 className={styles.globalChatSubHeaderName}>Global Chat</h6>
          </header>
          <hr className={styles.globalChatDetailsHeaderBottomHr} />
          <>
            {globalChatDetails.messagesGGChat.length === 0 ? (
              <div className={styles.globalChatNoMessagesContainer}>
                <p className={styles.globalChatNoMessagePara}>
                  Start a conversation, say Hi!
                </p>
              </div>
            ) : (
              <ul className={styles.globalChatDetailsMessagesContainer}>
                {globalChatDetails.messagesGGChat.map((message) => (
                  <Fragment key={message.id}>
                    <p className={styles.globalChatDetailsSendMessageDate}>
                      {format(message.createdAt, "dd/MM/yy")}
                    </p>
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
                              onClick={() =>
                                userLogInObj.role === "GUEST"
                                  ? ""
                                  : toggleMessageDropDown(message)
                              }
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
                                  className={styles.dropDownEditMessageForm}
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
                                  className={styles.dropDownMenuCancelBtn}
                                  onClick={() => {
                                    setShowDropDownMenu(false);
                                    setShowDropDownFormOnMessage(false);
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  className={styles.dropDownMenuSaveBtn}
                                  type="submit"
                                >
                                  Save
                                </button>
                              </form>
                            ) : (
                              <p
                                className={styles.globalChatDetailsSendMessage}
                                key={message.id}
                              >
                                {message.message_text}
                              </p>
                            )}
                            {showDropDownMenu ? (
                              <div
                                className={
                                  styles.globalChatDetailsDropDownMenuButtons
                                }
                              >
                                <button
                                  className={styles.dropDownMenuEditBtn}
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
                                  className={styles.dropDownMenuDeleteBtn}
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
                                        userLogInObj.role === "GUEST"
                                          ? ""
                                          : toggleMessageDropDown(message)
                                      }
                                      src="/three_dots.svg"
                                      alt="message drop-down menu"
                                    />
                                    {showDropDownMenu ? (
                                      <div
                                        className={
                                          styles.chatDetailsDropDownMenuButtons
                                        }
                                      >
                                        <button
                                          className={
                                            styles.dropDownMenuDeleteBtn
                                          }
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
                                    className={
                                      styles.globalChatDetailsSendImage
                                    }
                                    src={message.message_imageURL}
                                    alt="send image in globalChat"
                                  />
                                </div>
                              </>
                            ) : (
                              <img
                                key={message.id}
                                className={styles.globalChatDetailsSendImage}
                                src={message.message_imageURL}
                                alt="send image in globalChat"
                              />
                            )}
                          </>
                        )}
                      </ul>
                    ) : (
                      <>
                        {globalChatDetails.users.map((user) => (
                          <Fragment key={user.id}>
                            {user.id === message.userId ? (
                              <div
                                className={
                                  styles.globalChatReceiverSendingMessagesContainer
                                }
                              >
                                <div
                                  className={
                                    styles.globalChatDetailsUserUsername
                                  }
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
                                      alt="send image in globalChat"
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
            <hr className={styles.globalChatMessageDetailsBottomHr} />
            <form
              className={styles.flexGlobalChatDetailsSendMessageOrImageForm}
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
                placeholder="Note: you can't send a message or image at the same time!"
                maxLength={200}
                value={sendAGlobalChatMessageState}
                onChange={(e) => setSendAGlobalChatMessageState(e.target.value)}
              />
              <div className={styles.globalChatDetailsSendImageContainer}>
                <img
                  className={styles.globalChatDetailsSendImageSvg}
                  src="/send_image.svg"
                  alt="send a image in globalChat"
                />
                <input
                  className={styles.globalChatDetailsSendImageInput}
                  data-testid="message_image"
                  type="file"
                  name="file"
                  id="file"
                />
              </div>

              <div className={styles.globalChatDetailsSendMessageContainer}>
                <img
                  className={styles.globalChatDetailsSendMessageSvg}
                  src="/send_message.svg"
                  alt="send a message in globalChat"
                />
                <button
                  className={styles.globalChatDetailsSendMessageOrImageButton}
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        {showPopUpWhEditingMessage && (
          <PopUpModal
            popUpModalBackgroundColor={"white"}
            popUpModalContentColor={"black"}
            popUpModalBorderColor={"white"}
            popUpModalContentText={"Message edited!"}
          />
        )}
        {showPopUpWhDeletingMessage && (
          <PopUpModal
            popUpModalBackgroundColor={"white"}
            popUpModalContentColor={"black"}
            popUpModalBorderColor={"white"}
            popUpModalContentText={"Message deleted!"}
          />
        )}
        {showPopUpModalOnExpiredToken && (
          <PopUpModal
            popUpModalBackgroundColor={"red"}
            popUpModalContentColor={"white"}
            popUpModalBorderColor={"red"}
            popUpModalContentHeader={"Token expired"}
            popUpModalContentText={"Token has expired login again to continue!"}
          />
        )}
      </>
    );
  }
}

export default RenderGlobalChatDetailsMessages;
