import styles from "./CreateGroup.module.css";
import { useContext, useRef, useState, useEffect } from "react";
import { GroupsContext } from "../../contexts/GroupsContext";
import { useNavigate } from "react-router-dom";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import useFetchChatsURL from "../api/custom hooks/useFetchChatsURL";
import { FilterGroupMembers } from "../FilterGroupMembers";
import SearchBarGroupMembers from "../SearchBarGroupMembers";
import GroupMembersList from "../GroupMembersList";

function CreateGroup() {
  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  const [groups, setGroups] = useContext(GroupsContext);

  const { chats } = useFetchChatsURL();

  // console.log("Fetching the chats", chats);

  // console.log(groupMembers);

  // console.log(groupMembers);

  const [groupsName, setGroupName] = useState("");

  const [error, setError] = useState(null);

  const saveTheUsersThatHadChatWithTheUserArray = [];

  chats.map((chat) =>
    saveTheUsersThatHadChatWithTheUserArray.push(chat.receiverChat),
  );

  // console.log(
  //   "Pushed the users in the array, which the user had a chat with",
  //   array,
  // );

  const [groupMembers, setGroupMembers] = useState(
    saveTheUsersThatHadChatWithTheUserArray,
  );

  // console.log("Setting the groupMembers state to the array", groupMembers);

  const [selectedGroupMember, setSelectedGroupMember] = useState(groupMembers);

  // console.log(selectedGroupMember);

  const [searchForFriend, setSearchForFriend] = useState("");

  // console.log("Search for a user by typing", searchForFriend);

  const filterGroupFriendsResult = FilterGroupMembers(
    groupMembers,
    searchForFriend,
  );

  // console.log("Filtering the users based on typing", filterGroupFriendsResult);

  // console.log(searchForFriend);

  const [showSelectedGroupMember, setShowSelectedGroupMember] = useState(false);

  const selectedGroupUserMemberRef = useRef(null);

  const navigate = useNavigate();

  function searchForFriendInput(e) {
    setSearchForFriend(e.target.value);
  }

  function onClick(friend) {
    setShowSelectedGroupMember(true);

    setSelectedGroupMember(friend);

    // console.log(selectedGroupUserMemberRef.current);

    if (selectedGroupUserMemberRef.current.style.display === "none") {
      selectedGroupUserMemberRef.current.style.display = "flex";
    }
  }

  async function createGroup(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // formData.append("userId", selectedGroupMember.id);

    formData.append("group_creatorId", userLogInObj.id);

    // console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/groups", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      // console.log(response.status);

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
        <h5>Create Group</h5>
      </header>
      <hr />
      <form encType="multipart/formdata" onSubmit={createGroup}>
        <div className={styles.flexedGroupProfileAndChangeBtn}>
          <p>Group Profile</p>
          {/* <button>Change</button> */}
          <input data-testid="group_image" type="file" name="file" id="file" />
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
        <hr />
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
            />

            {groupsName.length < 3 && (
              <span>Group name must be between 3 and 30 characters</span>
            )}

            {error && <span className={styles.error}>{error}</span>}
          </div>
          <div className={styles.formGroupContent}>
            <SearchBarGroupMembers
              query={searchForFriend}
              onChange={searchForFriendInput}
            />
            {groupMembers.length !== 0 ? (
              <ul className={styles.ulDropDownGroupUserMembers}>
                <GroupMembersList
                  groupMembers={filterGroupFriendsResult}
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
                      <p>
                        {selectedGroupMember.first_name}{" "}
                        {selectedGroupMember.last_name}
                      </p>

                      <p>{"@" + selectedGroupMember.username}</p>
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
        <div className={styles.createGroupButton}>
          <button type="submit">Create Group</button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
