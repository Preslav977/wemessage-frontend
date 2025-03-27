import styles from "./RenderGroupDetailsMessages.module.css";
import { Link } from "react-router-dom";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { useContext, useState, useRef } from "react";
import useFetchSingleGroupURL from "../api/custom hooks/useFetchSingleGroupURL";
import { format } from "date-fns";

function RenderGroupDetailsMessages() {
  const { groupDetails, setGroupDetails, loading, error } =
    useFetchSingleGroupURL();

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  const [sendAGroupMessageState, setSendAGroupMessageState] = useState("");

  const [editTheSelectedGroupMessage, setEditTheSelectedGroupMessage] =
    useState();

  const dropDownFormRef = useRef(null);

  const [showDropDownMenuGroupMessage, setShowDropDownMenuGroupMessage] =
    useState(false);

  const [showDropDownGroupMessageForm, setShowDropDownGroupMessageForm] =
    useState(false);

  const [clickedGroupMessage, setClickedGroupMessage] = useState();

  const [showDropDownMenuGroupName, setShowDropDownMenuGroupName] =
    useState(false);

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  async function sendMessageInGroup(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${groupDetails.id}/message`,
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
        ...groupDetails,
        messagesGGChat: result.messagesGGChat,
      };

      setGroupDetails(sendMessageObj);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendImageInGroup(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${groupDetails.id}/image`,
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
        ...groupDetails,
        messagesGGChat: result.messagesGGChat,
      };

      setGroupDetails(sendImageObj);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleMessageDropDown(message) {
    setClickedGroupMessage(message.id);
    setShowDropDownMenuGroupMessage(true);
    setEditTheSelectedGroupMessage(message.message_text);

    if (clickedGroupMessage !== undefined) {
      setClickedGroupMessage(message.id);
    }
  }

  async function showEditGroupMessageForm(e) {
    e.preventDefault();

    setShowDropDownMenuGroupMessage(false);

    setShowDropDownGroupMessageForm(true);

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    console.log(getMessageTextFormData);

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${groupDetails.id}/message/${clickedGroupMessage}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            message_text: getMessageTextFormData,
            id: clickedGroupMessage,
            groupId: groupDetails.id,
          }),
        },
      );

      const result = await response.json();

      console.log(result);

      const editAMessage = {
        ...groupDetails,
        messagesGGChat: result.messagesGGChat,
      };

      console.log(groupDetails);

      setGroupDetails(editAMessage);

      setShowDropDownGroupMessageForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeMessageFromGroup(message) {
    const removeMessage = {
      ...groupDetails,
      messagesGGChat: groupDetails.messagesGGChat.filter(
        (msg) => msg.id !== message.id,
      ),
    };

    setGroupDetails(removeMessage);

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${groupDetails.id}/message/${message.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            messageId: clickedGroupMessage,
            userId: userLogInObj.id,
            groupId: groupDetails.id,
          }),
        },
      );

      const result = await response.json();

      const retrieveNewMessagesAfterDeletingAMessage = {
        ...groupDetails,
        messagesGGChat: result.messagesGGChat,
      };

      setGroupDetails(retrieveNewMessagesAfterDeletingAMessage);
    } catch (err) {
      console.log(err);
    }
  }

  async function joinGroup(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${groupDetails.id}/join`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: userLogInObj.id,
          }),
        },
      );
      const result = await response.json();

      console.log(result);

      const joinGroupObj = {
        ...groupDetails,
        users: result.users,
      };

      setGroupDetails(joinGroupObj);
    } catch (err) {
      console.log(err);
    }
  }

  async function editGroupName(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    console.log(formData);

    const formDataGroupName = formData.get("group_name");

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${groupDetails.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            group_name: formDataGroupName,
            group_creatorId: userLogInObj.id,
          }),
        },
      );

      const result = await response.json();

      const updateGroupNameObj = {
        ...groupDetails,
        group_name: result.group_name,
      };

      setGroupDetails(updateGroupNameObj);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteGroup(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${groupDetails.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            group_creatorId: userLogInObj.id,
          }),
        },
      );
      const result = await response.json();

      console.log(result);

      const deleteGroupObj = {
        ...groupDetails,
        result,
      };

      setGroupDetails(deleteGroupObj);
    } catch (err) {
      console.log(err);
    }
  }

  if (groupDetails === null) {
    return <h5>Groups</h5>;
  } else {
    return (
      <div className={styles.groupMessagesDetailsContainer}>
        <header className={styles.groupMessageDetailsHeader}>
          {!showDropDownMenuGroupName ? (
            <Link
              className={styles.groupMessageDetailsFlexedAnchor}
              to={`/groups/${groupDetails.id}`}
            >
              <img
                className={styles.groupDetailsUserProfilePicture}
                src={groupDetails.group_image}
                alt="group image"
              />
              <h6 className={styles.groupNameMessageDetails}>
                {groupDetails.group_name}
              </h6>
            </Link>
          ) : (
            <div>
              <img
                className={styles.groupDetailsUserProfilePicture}
                src={groupDetails.group_image}
                alt="group image"
              />
              <form onSubmit={editGroupName}>
                <label htmlFor="group_name"></label>
                <input type="text" name="group_name" id="group_name" />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
          <form onSubmit={joinGroup}>
            <button type="submit">Join</button>
          </form>
        </header>
        <div>
          <button onClick={() => setShowDropDownMenuGroupName(true)}>
            Edit
          </button>
          <form onSubmit={deleteGroup}>
            <button type="submit">Delete</button>
          </form>
        </div>
        <div className={styles.groupMessageDetailsTopHr}>
          <hr />
        </div>
        {groupDetails.users.some((obj) => obj.id === userLogInObj.id) ? (
          <>
            {groupDetails.messagesGGChat.length === 0 ? (
              <div className={styles.groupNoMessagesContainer}>
                <p>Start a conversation, say Hi!</p>
              </div>
            ) : (
              <div className={styles.groupDetailsMessagesContainer}>
                {groupDetails.messagesGGChat.map((message, index) => (
                  <>
                    {message.userId === userLogInObj.id ? (
                      <ul
                        key={message.id}
                        className={styles.groupDetailsUserMessage}
                      >
                        {message.message_text ? (
                          <div
                            className={styles.groupDetailsMessageDropDownMenu}
                          >
                            <img
                              className={styles.groupDetailsMessageDropDownImg}
                              onClick={() => toggleMessageDropDown(message)}
                              src="/three_dots.svg"
                              alt="message drop-down menu"
                            />
                            {showDropDownGroupMessageForm &&
                            message.id === clickedGroupMessage ? (
                              <form
                                style={{
                                  display: "block",
                                }}
                                ref={dropDownFormRef}
                                onSubmit={showEditGroupMessageForm}
                              >
                                <input
                                  type="text"
                                  name="message_text"
                                  id="message_text"
                                  value={editTheSelectedGroupMessage}
                                  onChange={(e) =>
                                    setEditTheSelectedGroupMessage(
                                      e.target.value,
                                    )
                                  }
                                />
                                <button
                                  onClick={() => {
                                    setShowDropDownMenuGroupMessage(false);
                                    setShowDropDownGroupMessageForm(false);
                                  }}
                                >
                                  Cancel
                                </button>
                                <button type="submit">Save</button>
                              </form>
                            ) : (
                              <li key={message.id}>{message.message_text}</li>
                              // <div>
                              //   {index === 0 ? (
                              //     <>
                              //       <p>
                              //         {format(message.createdAt, "dd/MM/yy")}
                              //       </p>
                              //       <p>{message.message_text}</p>
                              //     </>
                              //   ) : (
                              //     <p>{message.message_text}</p>
                              //   )}
                              // </div>
                            )}
                            {showDropDownMenuGroupMessage ? (
                              <div
                                className={
                                  styles.groupDetailsDropDownMenuButtons
                                }
                              >
                                <button
                                  onClick={() => {
                                    setShowDropDownGroupMessageForm(true);
                                    setShowDropDownMenuGroupMessage(false);
                                  }}
                                  style={{
                                    display:
                                      message.id === clickedGroupMessage
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    removeMessageFromGroup(message)
                                  }
                                  style={{
                                    display:
                                      message.id === clickedGroupMessage
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
                                    styles.groupDetailsMessageDropDownMenu
                                  }
                                >
                                  <div
                                    className={
                                      styles.groupDetailsMessageDropDownButtonWrapper
                                    }
                                  >
                                    <img
                                      className={
                                        styles.groupDetailsMessageDropDownImg
                                      }
                                      onClick={() =>
                                        toggleMessageDropDown(message)
                                      }
                                      src="/three_dots.svg"
                                      alt="message drop-down menu"
                                    />
                                    {showDropDownMenuGroupMessage ? (
                                      <div className={styles.btn}>
                                        <button
                                          onClick={() =>
                                            removeMessageFromGroup(message)
                                          }
                                          style={{
                                            display:
                                              message.id === clickedGroupMessage
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
                                    className={styles.groupDetailsSendImage}
                                    src={message.message_imageURL}
                                    alt="send image in chat"
                                  />
                                </div>
                              </>
                            ) : (
                              <img
                                key={message.id}
                                className={styles.groupDetailsSendImage}
                                src={message.message_imageURL}
                                alt="send image in chat"
                              />
                            )}
                          </>
                        )}
                      </ul>
                    ) : (
                      <>
                        {groupDetails.users.map((user) => (
                          <>
                            {user.id !== userLogInObj.id ? (
                              <div
                                key={user.id}
                                className={
                                  styles.groupReceiverSendingMessagesContainer
                                }
                              >
                                <div
                                  className={styles.groupDetailsUserUsername}
                                >
                                  <p>{"@" + user.username}</p>
                                </div>
                                <div
                                  className={
                                    styles.groupDetailsReceiverUserMessages
                                  }
                                >
                                  <Link to={`/profile/${user.id}`}>
                                    {user.profile_picture === "" ? (
                                      <img
                                        className={
                                          styles.groupDetailsUserDefaultProfilePicture
                                        }
                                        src="/default_users_pfp.jpg"
                                        alt="default user profile picture"
                                      />
                                    ) : (
                                      <img
                                        src={user.profile_picture}
                                        alt="user profile picture"
                                      />
                                    )}
                                  </Link>
                                  {message.message_text ? (
                                    <p
                                      key={message.id}
                                      className={styles.groupDetailsSendMessage}
                                    >
                                      {message.message_text}
                                    </p>
                                  ) : (
                                    <img
                                      className={styles.groupDetailsSendImage}
                                      src={message.message_imageURL}
                                      alt="send image in chat"
                                    />
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ))}
                      </>
                    )}
                  </>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>You must join a group first before sending a message!</p>
        )}

        {groupDetails.users.some((obj) => obj.id === userLogInObj.id) ? (
          <>
            <div className={styles.groupMessageDetailsBottomHr}>
              <hr />
            </div>
            <div className={styles.groupDetailsSendMessageOrImageContainer}>
              {sendAGroupMessageState !== "" ? (
                <form onSubmit={sendMessageInGroup}>
                  <input
                    className={styles.groupDetailsSendMessageInput}
                    type="text"
                    name="message_text"
                    id="message_text"
                    value={sendAGroupMessageState}
                    onChange={(e) => setSendAGroupMessageState(e.target.value)}
                  />
                  <input
                    className={styles.groupDetailsSendImageInput}
                    type="file"
                    name="file"
                    id="file"
                  />
                  <button
                    className={styles.groupDetailsSendMessageOrImageButton}
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              ) : (
                <form encType="multipart/form" onSubmit={sendImageInGroup}>
                  <input
                    className={styles.groupDetailsSendMessageInput}
                    type="text"
                    name="message_text"
                    id="message_text"
                    value={sendAGroupMessageState}
                    onChange={(e) => setSendAGroupMessageState(e.target.value)}
                  />
                  <input
                    className={styles.groupDetailsSendImageInput}
                    type="file"
                    name="file"
                    id="file"
                  />
                  <button
                    className={styles.groupDetailsSendMessageOrImageButton}
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default RenderGroupDetailsMessages;
