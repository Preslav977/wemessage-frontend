import styles from "./CreateGroup.module.css";
import { useContext, useState } from "react";
import { GroupsContext } from "../../contexts/GroupsContext";
import { useNavigate } from "react-router-dom";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { ChatsContext } from "../../contexts/ChatsContext";
import { FilterGroupMembers } from "../FilterGroupMembers/FilterGroupMembers";
import SearchBarGroupMembers from "../SearchBarGroupMembers/SearchBarGroupMembers";
import GroupMembersList from "../GroupMembersList/GroupMembersList";
import PopUpModal from "../PopUpModal/PopUpModal";

import localhostURL from "../../utility/localhostURL";

function CreateGroup() {
  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  const [groups, setGroups] = useContext(GroupsContext);

  const [chats, setChats] = useContext(ChatsContext);

  const [groupsName, setGroupName] = useState("");

  const [error, setError] = useState(null);

  const [showPopUpModalOnExpiredToken, setShowPopUpModalOnExpiredToken] =
    useState(false);

  const saveTheUsersThatHadChatWithTheUserArray = [];

  chats.map((chat) =>
    saveTheUsersThatHadChatWithTheUserArray.push(chat.receiverChat),
  );

  const [groupMembers, setGroupMembers] = useState(
    saveTheUsersThatHadChatWithTheUserArray,
  );

  const [selectedGroupMember, setSelectedGroupMember] = useState(groupMembers);

  const [searchForGroupMembers, setSearchForGroupMembers] = useState("");

  const filterGroupFriendsResult = FilterGroupMembers(
    groupMembers,
    searchForGroupMembers,
  );

  const [showSelectedGroupMember, setShowSelectedGroupMember] = useState(false);

  const navigate = useNavigate();

  function searchForGroupMembersInput(e) {
    setSearchForGroupMembers(e.target.value);
  }

  function onClick(friend) {
    setShowSelectedGroupMember(true);

    setSelectedGroupMember(friend);
  }

  async function createGroup(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append("userId", selectedGroupMember.id);

    formData.append("group_creatorId", userLogInObj.id);

    // console.log(formData);

    try {
      const response = await fetch(`${localhostURL}/groups`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      // console.log(response.status);

      if (response.status === 403) {
        setShowPopUpModalOnExpiredToken(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalOnExpiredToken(false);
        }, 3000);
      }

      const result = await response.json();

      // console.log(result);

      if (response.status === 200) {
        setGroupName("");

        setGroups([...groups, result]);

        navigate(`/groups/${result.id}`);
      } else {
        setError(result[0].msg);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <header>
        <h5 className={styles.createGroupHeader}>Create Group</h5>
      </header>
      <hr className={styles.createGroupHeaderBottomHr} />
      <form encType="multipart/formdata" onSubmit={createGroup}>
        <div className={styles.flexedGroupProfileAndChangeBtn}>
          <p className={styles.flexedGroupProfilePara}>Group Profile</p>
          <label className={styles.changeGroupImageLabel} htmlFor="group_image">
            Change
            <img
              className={styles.changeGroupImage}
              src="/edit_profile.svg"
              alt="change group image"
            />
            <input
              className={styles.changeGroupImageInput}
              data-testid="group_image"
              type="file"
              name="file"
              id="file"
              required
              disabled={userLogInObj.role === "GUEST" ? true : false}
            />
          </label>
        </div>
        <div className={styles.groupPreviewImgContainer}>
          <div className={styles.groupPreviewImgFlexedWrapper}>
            <img
              className={styles.groupPreviewImg}
              src="/default_pfp.svg"
              alt="group default image"
            />
          </div>
        </div>
        <hr className={styles.groupPreviewBottomHr} />
        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="group_name">Group name:</label>
            <input
              data-testid="group_name"
              type="text"
              name="group_name"
              id="group_name"
              minLength={3}
              maxLength={30}
              value={groupsName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />

            {groupsName.length < 3 && (
              <span className={styles.error}>
                Group name must be between 3 and 30 characters
              </span>
            )}

            {error && <span className={styles.error}>{error}</span>}
          </div>
          <div className={styles.formGroupContent}>
            <SearchBarGroupMembers
              query={searchForGroupMembers}
              onChange={searchForGroupMembersInput}
            />
            {groupMembers.length !== 0 ? (
              <ul className={styles.ulDropDownGroupUserMembers}>
                <GroupMembersList
                  groupMembers={filterGroupFriendsResult}
                  onClick={onClick}
                ></GroupMembersList>
                {showSelectedGroupMember ? (
                  <li className={styles.flexedLiDropDownSelectedUserContainer}>
                    {selectedGroupMember.profile_picture === "" ? (
                      <img
                        className={styles.dropDownUserMemberImg}
                        src="/default_user_pfp.svg"
                        alt="default user profile picture"
                      />
                    ) : (
                      <img
                        className={styles.userProfilePicture}
                        src={selectedGroupMember.profile_picture}
                        alt="user profile picture"
                      />
                    )}
                    <div>
                      <p className={styles.userFirstAndLastName}>
                        {selectedGroupMember.first_name}{" "}
                        {selectedGroupMember.last_name}
                      </p>

                      <p className={styles.userUsername}>
                        {"@" + selectedGroupMember.username}
                      </p>
                    </div>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.createGroupButtonContainer}>
          <button
            disabled={userLogInObj.role === "GUEST" ? true : false}
            className={styles.createGroupButton}
            type="submit"
          >
            Create Group
          </button>
        </div>
      </form>
      {showPopUpModalOnExpiredToken && (
        <PopUpModal
          popUpModalBackgroundColor={"red"}
          popUpModalContentColor={"white"}
          popUpModalBorderColor={"red"}
          popUpModalContentHeader={"Token expired"}
          popUpModalContentText={"Token has expired login again to continue!"}
        />
      )}
    </div>
  );
}

export default CreateGroup;
