import styles from "./RenderAllChats.module.css";
import useFetchChatsURL from "../api/custom hooks/useFetchChatsURL";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function RenderAllChats({ onClick }) {
  const { chats, error, loading } = useFetchChatsURL();

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
          alt="click to toggle and user for a user"
          onClick={onClick}
        />
      </header>
      {chats.length === 0 ? (
        <p>{"You currently have no chats"}</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <Link to={`/chats/${chat.id}`} key={chat.user.id}>
              <li className={styles.flexedNestedLiUserContainer}>
                {chat.user.profile_picture === "" ? (
                  <img
                    className={styles.usersProfilePicture}
                    src="/default_user_pfp.svg"
                    alt="default user profile picture"
                  />
                ) : (
                  <img
                    className={styles.usersProfilePicture}
                    src={chat.user.profile_picture}
                    alt="user profile picture"
                  />
                )}
                <div>
                  <p>
                    {chat.user.first_name} {chat.user.last_name}
                  </p>
                  <p>{"@" + chat.user.username}</p>
                </div>
              </li>
            </Link>
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
