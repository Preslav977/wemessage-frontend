import styles from "./RenderAllChats.module.css";
import useFetchChatsURL from "../api/custom hooks/useFetchChatsURL";
import { Link } from "react-router-dom";

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
      <div className={styles.flexedChatsContainer}>
        <h4>Chats</h4>
        <img
          className={styles.usersImages}
          src="./open.svg"
          alt=""
          onClick={onClick}
        />
      </div>
      {chats.length === 0 ? (
        <p>{"You currently have no chats"}</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <Link to={`/chats/${chat.id}`} key={chat.user.id}>
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
    </>
  );
}

export default RenderAllChats;
