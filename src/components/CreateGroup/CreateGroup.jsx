import styles from "./CreateGroup.module.css";
import { useContext, useRef, useState } from "react";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { GroupsContext } from "../../contexts/GroupsContext";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  const [groups, setGroups] = useContext(GroupsContext);

  const [groupFriends, setGroupFriends] = useState();

  const [groupsName, setGroupName] = useState("");

  const [error, setError] = useState(null);

  const [selectedGroupMember, setSelectedGroupMember] = useState();

  // console.log(selectedGroupMember);

  const [showSelectedGroupMember, setShowSelectedGroupMember] = useState(false);

  const selectedGroupUserMemberRef = useRef(null);

  const navigate = useNavigate();

  async function searchForGroupFriends(e) {
    try {
      const fetchGroupFriends = await fetch(
        `http://localhost:5000/groups/search/?query=${e.target.value}`,
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      const getGroupMembers = await fetchGroupFriends.json();

      const filterTheLoggedInUser = getGroupMembers.filter(
        (obj) => obj.id !== 2,
      );

      setGroupFriends(filterTheLoggedInUser);
    } catch (err) {
      console.log(err);
    }
  }

  function onClick(friend) {
    setShowSelectedGroupMember(true);

    setSelectedGroupMember(friend);

    console.log(selectedGroupUserMemberRef.current);

    if (selectedGroupUserMemberRef.current.style.display === "flex") {
      selectedGroupUserMemberRef.current.style.display = "none";
    }
  }

  async function createGroup(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.get("group_name");

    formData.append("userId", selectedGroupMember.id);

    formData.append("group_creatorId", userLogInObj.id);

    try {
      const response = await fetch("http://localhost:5000/groups", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const result = await response.json();

      if (response.status === 200) {
        setGroupName("");

        console.log(result);

        setGroups([...groups, result]);

        navigate("/groups");
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
          <input type="file" name="file" id="file" />
        </div>
        <div className={styles.groupPreviewImgContainer}>
          <div className={styles.groupPreviewImgFlexedWrapper}>
            <img
              className={styles.groupPreviewImg}
              src="/default_pfp.svg"
              alt=""
            />
          </div>
        </div>
        <hr />
        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="">Group name:</label>
            <input
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
            <label htmlFor="">Select members:</label>
            <input type="text" name="" id="" onChange={searchForGroupFriends} />
            {groupFriends !== undefined ? (
              <ul className={styles.ulDropDownGroupUserMembers}>
                {groupFriends.map((friend) => (
                  <li
                    style={{
                      display: "flex",
                    }}
                    ref={selectedGroupUserMemberRef}
                    onClick={() => onClick(friend)}
                    key={friend.id}
                    className={styles.flexedLiDropDownUsersContainer}
                  >
                    {friend.profile_picture === "" ? (
                      <img
                        className={styles.dropDownUserMemberImg}
                        src="/default_user_pfp.svg"
                        alt="default user profile picture"
                      />
                    ) : (
                      <img
                        className={styles.userProfilePicture}
                        src={friend.profile_picture}
                        alt="user profile picture"
                      />
                    )}
                    <div>
                      <p>
                        {friend.first_name} {friend.last_name}
                      </p>

                      <p>{"@" + friend.username}</p>
                    </div>
                  </li>
                ))}
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
          <button>Create Group</button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
