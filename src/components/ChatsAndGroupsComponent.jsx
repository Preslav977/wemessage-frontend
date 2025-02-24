import styles from "./ChatsAndGroupsComponent.module.css";
import { ChatsContext } from "../contexts/ChatsContext";
import { useContext, useState } from "react";

function ChatsAndGroupsComponent({
  headerName,
  chatsAndGroupContent,
  onClick,
}) {
  const [chats, setChats] = useContext(ChatsContext);

  return (
    <>
      <header className={styles.flexedChatsAndGroupsHeader}>
        <h2>{headerName}</h2>
        <img
          className={styles.toggleChatsAndGroupsSvg}
          src="/open.svg"
          alt=""
          onClick={onClick}
        />
      </header>
      <div>
        {chats.length === 0 ? (
          <p>{chatsAndGroupContent}</p>
        ) : (
          <ul>
            <li></li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ChatsAndGroupsComponent;
