import { useContext, useState } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import FetchAndSearchForUsers from "../api/FetchAndSearchForUsers";
import PropTypes from "prop-types";
import RenderAllChats from "../RenderAllChats/RenderAllChats";
import PopUpModal from "../PopUpModal/PopUpModal";

function ToggleBetweenChatsOrSearchForUser({ renderChatsOrGlobalChat }) {
  const [users, setUsers] = useContext(UsersContext);

  const [toggleBetweenChatAndUsers, setToggleBetweenChatAndUsers] =
    useState(false);

  const [showPopUpModalOnExpiredToken, setShowPopUpModalOnExpiredToken] =
    useState(false);

  function toggleChatsOrUsers() {
    setToggleBetweenChatAndUsers(!toggleBetweenChatAndUsers);
  }

  async function searchForUsers(e) {
    try {
      const fetchUsersBySearching = await fetch(
        `http://localhost:5000/users/search/?query=${e.target.value}`,
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      if (fetchUsersBySearching.status === 403) {
        setShowPopUpModalOnExpiredToken(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalOnExpiredToken(false);
        }, 3000);
      }

      const getFoundUser = await fetchUsersBySearching.json();

      // console.log(getFoundUser);

      setUsers(getFoundUser);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!renderChatsOrGlobalChat && !toggleBetweenChatAndUsers ? (
        <RenderAllChats onClick={toggleChatsOrUsers} />
      ) : (
        <FetchAndSearchForUsers
          onClick={toggleChatsOrUsers}
          onChange={searchForUsers}
        />
      )}
      {showPopUpModalOnExpiredToken && (
        <PopUpModal
          popUpModalBackgroundColor={"red"}
          popUpModalContentColor={"white"}
          popUpModalBorderColor={"red"}
          popUpModalContentHeader={"Token expired"}
          popUpModalContentText={"Token has expired login again to continue!"}
        />
      )}
    </>
  );
}

ToggleBetweenChatsOrSearchForUser.propTypes = {
  renderChatsOrGlobalChat: PropTypes.bool,
};

export default ToggleBetweenChatsOrSearchForUser;
