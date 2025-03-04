import styles from "./ChatList.module.css";
import useFetchChatsURL from "../api/custom hooks/useFetchChatsURL";
import { Link } from "react-router-dom";

function RenderAllChats() {
  const { chats, error, loading } = useFetchChatsURL();

  console.log(chats);

  return (
    <>
      {chats.length === 0 ? (
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
    </>
  );
}

export default RenderAllChats;
