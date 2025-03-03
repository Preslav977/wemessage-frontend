import styles from "./RenderChatsOrGroupsComponent.module.css";
import PropTypes from "prop-types";
import useChatsURL from "./api/custom hooks/useChatsURL";
import { Link } from "react-router-dom";

function RenderChatsOrGroupsComponent({
  showChatOrGroupHeader,
  onClick,
  renderChatOrGroup,
}) {
  const { chats, error, loading } = useChatsURL();

  if (loading) {
    return <img src="/loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <>
      <header className={styles.flexedChatsAndGroupsHeader}>
        <h2>{showChatOrGroupHeader}</h2>
        <img
          className={styles.toggleChatsAndGroupsSvg}
          src="/open.svg"
          alt=""
          onClick={onClick}
        />
      </header>
      <div>
        {!renderChatOrGroup && chats.length === 0 ? (
          <p>{"You currently have no chats"}</p>
        ) : (
          <ul>
            {chats.map((chat) => (
              <Link to={`/chat/${chat.id}`} key={chat.user.id}>
                <li className={styles.flexedUsersLiContainer}>
                  {chat.user.profile_picture === "" ? (
                    <img
                      className={styles.usersImages}
                      src="/default_user_pfp.svg"
                      alt=""
                    />
                  ) : (
                    <img
                      className={styles.usersImages}
                      src={chat.user.profile_picture}
                      alt=""
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
      </div>
    </>
  );
}

RenderChatsOrGroupsComponent.propTypes = {
  showChatOrGroupHeader: PropTypes.string,
  onClick: PropTypes.func,
  renderChatOrGroup: PropTypes.bool,
};

export default RenderChatsOrGroupsComponent;
