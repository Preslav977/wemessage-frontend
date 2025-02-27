import styles from "./RenderChatsOrGroupComponent.module.css";
import { ChatsContext } from "../contexts/ChatsContext";
import { useContext, useState } from "react";
import PropTypes from "prop-types";

function RenderChatsOrGroupsComponent({
  showChatOrGroupHeader,
  onClick,
  renderChatOrGroup,
}) {
  const [chats, setChats] = useContext(ChatsContext);

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
            <li></li>
          </ul>
        )}
        {renderChatOrGroup && chats.length === 0 ? (
          <p>{"You currently have no groups"}</p>
        ) : (
          <ul>
            <li></li>
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
