import styles from "./RenderGroupDetailsMessages.module.css";
import { Link } from "react-router-dom";
import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext, useState, useRef } from "react";
import useFetchSingleGroupURL from "./api/custom hooks/useFetchSingleGroupURL";

function RenderGroupDetailsMessages() {
  const { groupDetails, setGroupDetails, loading, error } =
    useFetchSingleGroupURL();

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  // console.log(groupDetails.messagesGGChat[0].userId, userLogInObj.id);

  const [sendAGroupMessageState, setSendAGroupMessageState] = useState("");

  const [editTheSelectedGroupMessage, setEditTheSelectedGroupMessage] =
    useState();

  const dropDownFormRef = useRef(null);

  const [showDropDownMenuGroupMessage, setShowDropDownMenuGroupMessage] =
    useState(false);

  const [showDropDownGroupMessageForm, setShowDropDownGroupMessageForm] =
    useState(false);

  const [clickedGroupMessage, setClickedGroupMessage] = useState();

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

  if (groupDetails === null) {
    return <h5>Groups</h5>;
  } else {
    return (
      <div className={styles.groupMessagesDetailsContainer}>
        <header className={styles.groupMessageDetailsHeader}>
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
        </header>
        <div className={styles.groupMessageDetailsTopHr}>
          <hr />
        </div>
        {groupDetails.messagesGGChat.length === 0 ? (
          <div className={styles.groupNoMessagesContainer}>
            <p>Start a conversation, say Hi!</p>
          </div>
        ) : (
          <div className={styles.groupDetailsMessagesContainer}>
            {groupDetails.messagesGGChat.map((message) => (
              <>
                {message.userId === userLogInObj.id ? (
                  <ul
                    key={message.id}
                    className={styles.groupDetailsUserMessage}
                  >
                    {message.message_text ? (
                      <div className={styles.groupDetailsMessageDropDownMenu}>
                        <img
                          className={styles.groupDetailsMessageDropDownImg}
                          // onClick={() => toggleMessageDropDown(message)}
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
                            // onSubmit={showEditMessageForm}
                          >
                            <input
                              type="text"
                              name="message_text"
                              id="message_text"
                              value={editTheSelectedGroupMessage}
                              onChange={(e) =>
                                setEditTheSelectedGroupMessage(e.target.value)
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
                          <li className={styles.groupDetailsSendMessage}>
                            {message.message_text}
                          </li>
                        )}
                        {setShowDropDownMenuGroupMessage ? (
                          <div
                            className={styles.groupDetailsDropDownMenuButtons}
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
                              // onClick={() => removeMessageFromChat(message)}
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
                          <div
                            className={styles.groupDetailsMessageDropDownMenu}
                          >
                            <img
                              className={styles.groupDetailsMessageDropDownImg}
                              // onClick={() => toggleMessageDropDown(message)}
                              src="/three_dots.svg"
                              alt="message drop-down menu"
                            />
                            <img
                              className={styles.groupDetailsSendImage}
                              src={message.message_imageURL}
                              alt="send image in chat"
                            />
                          </div>
                        ) : (
                          <img
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
                            <div className={styles.groupDetailsUserUsername}>
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
                              <p
                                key={message.id}
                                className={styles.groupDetailsSendMessage}
                              >
                                {message.message_text}
                              </p>
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
        <div className={styles.groupMessageDetailsBottomHr}>
          <hr />
        </div>
        <div className={styles.groupDetailsSendMessageOrImageContainer}>
          {sendAGroupMessageState === "" ? (
            <form onSubmit={() => console.log("test")}>
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
          )}
        </div>
      </div>
    );
  }
}

export default RenderGroupDetailsMessages;
