import styles from "./RenderGroupDetailsMessages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, Fragment } from "react";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import useFetchSingleGroupURL from "../api/custom hooks/useFetchSingleGroupURL";
import { format } from "date-fns";

function RenderGroupDetailsMessages() {
  const { groupDetails, setGroupDetails, loading, error } =
    useFetchSingleGroupURL();

  // console.log(groupDetails);

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  // this state will be used a condition to send a message or image in the form
  const [sendAGroupMessageState, setSendAGroupMessageState] = useState("");

  //this state will selected the clicked message in the array
  const [editTheSelectedGroupMessage, setEditTheSelectedGroupMessage] =
    useState();

  //this will show or hide the drop-down menu
  const dropDownFormRef = useRef(null);

  //this state will render the drop-down menu when is true
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  //this state will render the input or textarea to edit the message
  const [showDropDownFormOMessage, setShowDropDownFormOMessage] =
    useState(false);

  const [clickedGroupMessage, setClickedGroupMessage] = useState();

  //this state will render the input with the group name
  const [showDropDownMenuGroupName, setShowDropDownMenuGroupName] =
    useState(false);

  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>Failed to fetch groups details!</p>;
  }

  async function sendMessageInGroup(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    setSendAGroupMessageState("");

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

    setSendAGroupMessageState("");

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

  //function that gets the current clicked message
  //then renders the drop-down menu
  //edits the message and hides the drop-down
  function toggleMessageDropDown(message) {
    setClickedGroupMessage(message.id);
    setShowDropDownMenu(true);
    setEditTheSelectedGroupMessage(message.message_text);

    //since the state is undefined check if is not
    //then get the messageID
    if (clickedGroupMessage !== undefined) {
      setClickedGroupMessage(message.id);
    }
  }

  async function showEditGroupMessageForm(e) {
    e.preventDefault();

    setShowDropDownMenu(false);

    setShowDropDownFormOMessage(true);

    const formData = new FormData(e.target);

    const getMessageTextFormData = formData.get("message_text");

    console.log(getMessageTextFormData);

    setSendAGroupMessageState("");

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

      setShowDropDownFormOMessage(false);
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

    // console.log(formData);

    const formDataGroupName = formData.get("group_name");

    setGroupName("");

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

      console.log(result);

      const updateGroupNameObj = {
        ...groupDetails,
        group_name: result.group_name,
      };

      setGroupDetails(updateGroupNameObj);

      navigate(`/groups/create`);
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
                <input
                  data-testid="group_name"
                  type="text"
                  name="group_name"
                  id="group_name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
          {/* check if the users array of the group contains the loggedIn userId */}
          {groupDetails.users.some((obj) => obj.id === userLogInObj.id) ? (
            <button>Joined</button>
          ) : (
            <form onSubmit={joinGroup}>
              <button type="submit">Join</button>
            </form>
          )}
        </header>

        {/* if the groupCreatorId is the loggedIn userId render this form */}
        {groupDetails.group_creatorId === userLogInObj.id ? (
          <div>
            {/* <button onClick={() => setShowDropDownMenuGroupName(true)}>
              Edit
            </button> */}
            {/* <form onSubmit={deleteGroup}>
              <button type="submit">Delete</button>
            </form> */}
          </div>
        ) : (
          ""
        )}

        {/* if the users array of the group contains the userId then he is joined the group */}
        {groupDetails.users.some((obj) => obj.id === userLogInObj.id) ? (
          <>
            {groupDetails.messagesGGChat.length === 0 ? (
              <div className={styles.groupNoMessagesContainer}>
                <p>Start a conversation, say Hi!</p>
              </div>
            ) : (
              <ul className={styles.groupDetailsMessagesContainer}>
                {groupDetails.messagesGGChat.map((message, index) => (
                  <Fragment key={message.id}>
                    {/* if the first element index is 0 or the date of that 
                message is not equal to the first one render the date 
                otherwise  don't
                 */}
                    {index === 0 ||
                    format(message.createdAt, "MM/dd/yy") !==
                      format(
                        groupDetails.messagesGGChat[0].createdAt,
                        "MM/dd/yy",
                      ) ? (
                      <p>{format(message.createdAt, "MM/dd/yy")}</p>
                    ) : (
                      ""
                    )}
                    {message.userId === userLogInObj.id ? (
                      <div className={styles.groupDetailsUserMessage}>
                        {message.message_text ? (
                          <li
                            className={styles.groupDetailsMessageDropDownMenu}
                          >
                            <img
                              className={styles.groupDetailsMessageDropDownImg}
                              onClick={() => toggleMessageDropDown(message)}
                              src="/three_dots.svg"
                              alt="message drop-down menu"
                            />
                            {showDropDownFormOMessage &&
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
                                  data-testid="message_text"
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
                                    setShowDropDownMenu(false);
                                    setShowDropDownFormOMessage(false);
                                  }}
                                >
                                  Cancel
                                </button>
                                <button type="submit">Save</button>
                              </form>
                            ) : (
                              <p
                                className={styles.groupDetailsSendMessage}
                                key={message.id}
                              >
                                {message.message_text}
                              </p>
                            )}
                            {showDropDownMenu ? (
                              <div
                                className={
                                  styles.groupDetailsDropDownMenuButtons
                                }
                              >
                                <button
                                  onClick={() => {
                                    setShowDropDownFormOMessage(true);
                                    setShowDropDownMenu(false);
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
                          </li>
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
                                    {showDropDownMenu ? (
                                      <div
                                        className={
                                          styles.deleteGroupMessageButton
                                        }
                                      >
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
                      </div>
                    ) : (
                      <>
                        {groupDetails.users.map((user) => (
                          <Fragment key={user.id}>
                            {user.id !== userLogInObj.id ? (
                              <div
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
                                      className={styles.groupDetailsSendMessage}
                                    >
                                      {message.message_text}
                                    </li>
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
                          </Fragment>
                        ))}
                      </>
                    )}
                  </Fragment>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p>You must join a group first before sending a message!</p>
        )}

        {groupDetails.users.some((obj) => obj.id === userLogInObj.id) ? (
          <>
            <div className={styles.groupDetailsSendMessageOrImageContainer}>
              <form
                encType="multipart/form"
                onSubmit={
                  sendAGroupMessageState !== ""
                    ? sendMessageInGroup
                    : sendImageInGroup
                }
              >
                <input
                  className={styles.groupDetailsSendMessageInput}
                  data-testid="message_text"
                  type="text"
                  name="message_text"
                  id="message_text"
                  maxLength={200}
                  value={sendAGroupMessageState}
                  onChange={(e) => setSendAGroupMessageState(e.target.value)}
                />
                <input
                  className={styles.groupDetailsSendImageInput}
                  data-testid="message_image"
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
