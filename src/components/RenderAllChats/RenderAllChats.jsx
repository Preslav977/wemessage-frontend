import styles from "./RenderAllChats.module.css";
import useFetchChatsURL from "../api/custom hooks/useFetchChatsURL";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { useContext } from "react";
import { Fragment } from "react";

function RenderAllChats({ onClick }) {
  const { chats, error, loading } = useFetchChatsURL();

  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <>
      <header className={styles.flexedChatHeaderContainer}>
        <h4>Chats</h4>
        <img
          className={styles.openSearchForAUserSvg}
          src="/open.svg"
          alt="click to toggle and search for a user"
          onClick={onClick}
        />
      </header>
      {chats.length === 0 ? (
        <p>{"You currently have no chats"}</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <Fragment key={chat.id}>
              {chat.senderChatId === userLogInObj.id ? (
                <Link to={`/chats/${chat.id}`} key={chat.id}>
                  <li className={styles.flexedNestedLiUserContainer}>
                    {chat.receiverChat.profile_picture === "" ? (
                      <img
                        className={styles.usersProfilePicture}
                        src="/default_user_pfp.svg"
                        alt="default user profile picture"
                      />
                    ) : (
                      <img
                        className={styles.usersProfilePicture}
                        src={chat.senderChat.profile_picture}
                        alt="user profile picture"
                      />
                    )}
                    <div>
                      <p>
                        {chat.receiverChat.first_name}{" "}
                        {chat.receiverChat.last_name}
                      </p>
                      <p>{"@" + chat.receiverChat.username}</p>
                    </div>
                  </li>
                </Link>
              ) : (
                <Link to={`/chats/${chat.id}`} key={chat.id}>
                  <li className={styles.flexedNestedLiUserContainer}>
                    {chat.senderChat.profile_picture === "" ? (
                      <img
                        className={styles.usersProfilePicture}
                        src="/default_user_pfp.svg"
                        alt="default user profile picture"
                      />
                    ) : (
                      <img
                        className={styles.usersProfilePicture}
                        src={chat.senderChat.profile_picture}
                        alt="user profile picture"
                      />
                    )}
                    <div>
                      <p>
                        {chat.senderChat.first_name} {chat.senderChat.last_name}
                      </p>
                      <p>{"@" + chat.senderChat.username}</p>
                    </div>
                  </li>
                </Link>
              )}
            </Fragment>
          ))}
        </ul>
      )}
    </>
  );
}

RenderAllChats.propTypes = {
  onClick: PropTypes.func,
};

export default RenderAllChats;
