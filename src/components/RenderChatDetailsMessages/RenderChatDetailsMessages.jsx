import styles from "./RenderChatDetailsMessages.module.css";
import { Link } from "react-router-dom";
import { useContext, useState, useRef, Fragment } from "react";
import { format } from "date-fns";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import useFetchSingleChatURL from "../api/custom hooks/useFetchSingleChatURL";
import PopUpModal from "../PopUpModal/PopUpModal";

import localhostURL from "../../utility/localhostURL";

function RenderChatDetailsMessages() {
  const { chatDetails, setChatDetails, error, loading } =
    useFetchSingleChatURL();

  console.log(chatDetails);

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  // console.log(userLogInObj.id);

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

  const [showPopUpModalOnExpiredToken, setShowPopUpModalOnExpiredToken] =
    useState(false);

  const [showPopUpWhEditingMessage, setShowPopUpWhenEditingMessage] =
    useState(false);

  const [showPopUpWhDeletingMessage, setShowPopUpWhenDeletingMessage] =
    useState(false);

  if (loading) {
    // return <img src="./loading_spinner.svg" alt="Loading..." />;

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
      <p className={styles.errorParagraph}>Failed to fetch chat details!</p>
    );
  }

  async function sendMessageInChat(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    setSendAMessageState("");

    try {
      if (userLogInObj.id === chatDetails.senderChat.id) {
        const response = await fetch(
          `${localhostURL}/chats/${chatDetails.id}/message`,
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

        console.log(
          "The current loggedIn user",
          userLogInObj.id,
          "The receiverChatId",
          chatDetails.receiverChat.id,
        );

        if (response.status === 403) {
          setShowPopUpModalOnExpiredToken(true);

          //reset the state in order to popup the modal again
          setTimeout(() => {
            setShowPopUpModalOnExpiredToken(false);
          }, 3000);
        }

        const result = await response.json();

        console.log(result);

        const sendMessageObj = {
          ...chatDetails,
          messages: result.messages,
        };

        // console.log(chatDetails);

        setChatDetails(sendMessageObj);
      } else {
        const response = await fetch(
          `${localhostURL}/chats/${chatDetails.id}/message`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              message_text: getMessageTextFormData,
              senderMessageId: userLogInObj.id,
              receiverId: chatDetails.senderChat.id,
            }),
          },
        );

        console.log(
          "The current loggedIn user",
          userLogInObj.id,
          "The receiverChatId",
          chatDetails.receiverChat.id,
        );

        if (response.status === 403) {
          setShowPopUpModalOnExpiredToken(true);

          //reset the state in order to popup the modal again
          setTimeout(() => {
            setShowPopUpModalOnExpiredToken(false);
          }, 3000);
        }

        const result = await response.json();

        console.log(result);

        const sendMessageObj = {
          ...chatDetails,
          messages: result.messages,
        };

        // console.log(chatDetails);

        setChatDetails(sendMessageObj);
      }
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
        `${localhostURL}/chats/${chatDetails.id}/image`,
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

    // console.log(getMessageTextFormData);

    setSendAMessageState("");

    try {
      const response = await fetch(
        `${localhostURL}/chats/${chatDetails.id}/message/${clickedMessage}`,
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

      // console.log(response);

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
        `${localhostURL}/chats/${chatDetails.id}/message/${message.id}`,
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
    return <h5 className={styles.chatDetailsHeader}>Chats</h5>;
  } else {
    return (
      <>
        <div className={styles.chatMessagesDetailsContainer}>
          <header className={styles.chatMessageDetailsHeader}>
            {userLogInObj.id === chatDetails.senderChat.id ? (
              <Link
                className={styles.chatMessageDetailsFlexedAnchor}
                to={`/profile/${chatDetails.receiverChat.id}`}
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
            ) : (
              <Link
                className={styles.chatMessageDetailsFlexedAnchor}
                to={`/profile/${chatDetails.senderChat.id}`}
              >
                {chatDetails.senderChat.profile_picture === "" ? (
                  <img
                    className={styles.chatDetailsUserProfilePicture}
                    src="/default_users_pfp.jpg"
                    alt="user default profile picture"
                  />
                ) : (
                  <img
                    className={styles.chatDetailsUserProfilePicture}
                    src={chatDetails.senderChat.profile_picture}
                    alt="user profile picture"
                  />
                )}
                <h6 className={styles.chatMessageDetailsUserFirstAndLastName}>
                  {chatDetails.senderChat.first_name}{" "}
                  {chatDetails.senderChat.last_name}
                </h6>
              </Link>
            )}
            <hr className={styles.chatDetailsHeaderBottomHr} />
          </header>

          {chatDetails.messages.length === 0 ? (
            <div className={styles.chatNoMessagesContainer}>
              <p className={styles.chatNoMessagesPara}>
                Start a conversation, say Hi!
              </p>
            </div>
          ) : (
            <ul className={styles.chatDetailsMessagesContainer}>
              {chatDetails.messages.map((message) => (
                <Fragment key={message.id}>
                  <p className={styles.chatDetailsSendMessageDate}>
                    {format(message.createdAt, "dd/MM/yy")}
                  </p>

                  {/* if the messageId equal the loggedIn userId render the message of that user  */}
                  {message.senderMessageId === userLogInObj.id ? (
                    <li className={styles.chatDetailsUserMessage}>
                      {message.message_text ? (
                        <div className={styles.chatDetailsMessageDropDownMenu}>
                          <img
                            className={styles.chatDetailsMessageDropDownImg}
                            onClick={() =>
                              userLogInObj.role === "GUEST"
                                ? ""
                                : toggleMessageDropDown(message)
                            }
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
                                className={styles.dropDownEditMessageForm}
                                type="text"
                                name="message_text"
                                id="message_text"
                                value={editTheSelectedMessage}
                                onChange={(e) =>
                                  setEditTheSelectedMessage(e.target.value)
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
                              key={message.id}
                              className={styles.chatDetailsSendMessage}
                            >
                              {message.message_text}
                            </p>
                          )}

                          {showDropDownMenu ? (
                            <div
                              className={styles.chatDetailsDropDownMenuButtons}
                            >
                              <button
                                className={styles.dropDownMenuEditBtn}
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
                                className={styles.dropDownMenuDeleteBtn}
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
                            <>
                              <div
                                className={
                                  styles.chatDetailsMessageDropDownMenu
                                }
                              >
                                <div
                                  className={
                                    styles.chatDetailsMessageDropDownButtonWrapper
                                  }
                                >
                                  <img
                                    className={
                                      styles.chatDetailsMessageDropDownImg
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
                                    <div className={styles.deleteMessageBtn}>
                                      <button
                                        className={styles.dropDownMenuDeleteBtn}
                                        onClick={() =>
                                          removeMessageFromChat(message)
                                        }
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
                                <img
                                  key={message.id}
                                  className={styles.chatDetailsSendImage}
                                  src={message.message_imageURL}
                                  alt="send image in chat"
                                />
                              </div>
                            </>
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
                        {chatDetails.senderChat.id === userLogInObj.id ? (
                          <>
                            <div className={styles.chatDetailsUserUsername}>
                              <p>{"@" + chatDetails.receiverChat.username}</p>
                            </div>
                            <div
                              className={styles.chatDetailsReceiverUserMessages}
                            >
                              <Link
                                to={`/profile/${chatDetails.receiverChat.id}`}
                              >
                                {chatDetails.receiverChat.profile_picture ===
                                "" ? (
                                  <img
                                    className={
                                      styles.chatDetailsUserDefaultProfilePicture
                                    }
                                    src="/default_users_pfp.jpg"
                                    alt="user default profile picture"
                                  />
                                ) : (
                                  <img
                                    className={
                                      styles.chatDetailsUserProfilePicture
                                    }
                                    src={
                                      chatDetails.receiverChat.profile_picture
                                    }
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
                          </>
                        ) : (
                          <>
                            <div className={styles.chatDetailsUserUsername}>
                              <p>{"@" + chatDetails.senderChat.username}</p>
                            </div>
                            <div
                              className={styles.chatDetailsReceiverUserMessages}
                            >
                              <Link
                                to={`/profile/${chatDetails.senderChat.id}`}
                              >
                                {chatDetails.senderChat.profile_picture ===
                                "" ? (
                                  <img
                                    className={
                                      styles.chatDetailsUserDefaultProfilePicture
                                    }
                                    src="/default_users_pfp.jpg"
                                    alt="user default profile picture"
                                  />
                                ) : (
                                  <img
                                    className={
                                      styles.chatDetailsUserProfilePicture
                                    }
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
                          </>
                        )}
                      </div>
                    </>
                  )}
                </Fragment>
              ))}
            </ul>
          )}

          <div className={styles.chatDetailsSendMessageOrImageContainer}>
            <hr className={styles.chatMessageDetailsBottomHr} />
            <form
              className={styles.flexChatDetailsSendMessageOrImageForm}
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
                placeholder="Note: you can't send a message or image at the same time!"
                onChange={(e) => setSendAMessageState(e.target.value)}
              />

              <div className={styles.chatDetailsSendImageContainer}>
                <img
                  className={styles.chatDetailsSendImageSvg}
                  src="/send_image.svg"
                  alt="send image in chat"
                />
                <input
                  className={styles.chatDetailsSendImageInput}
                  data-testid="message_image"
                  type="file"
                  name="file"
                  id="file"
                  disabled={userLogInObj.role === "GUEST" ? true : false}
                />
              </div>
              <div className={styles.chatDetailsSendMessageContainer}>
                <img
                  className={styles.chatDetailsSendMessageSvg}
                  src="/send_message.svg"
                  alt="send a message in chat"
                />
                <button
                  className={styles.chatDetailsSendMessageOrImageButton}
                  type="submit"
                  disabled={userLogInObj.role === "GUEST" ? true : false}
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

export default RenderChatDetailsMessages;
