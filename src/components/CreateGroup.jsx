import styles from "./CreateGroup.module.css";

import { useRef, useState } from "react";
function CreateGroup() {
  const [groupFriends, setGroupFriends] = useState();

  const [selectedGroupMember, setSelectedGroupMember] = useState(true);

  const [showSelectedGroupMember, setShowSelectedGroupMember] = useState();

  const selectedGroupUserMemberRef = useRef(null);

  async function searchForGroupFriends(e) {
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

    const filterTheLoggedInUser = getGroupMembers.filter((obj) => obj.id !== 2);

    setGroupFriends(filterTheLoggedInUser);
  }

  function onClick(friend) {
    setShowSelectedGroupMember(true);

    setSelectedGroupMember(friend);

    if (selectedGroupUserMemberRef.current.style.display === "flex") {
      selectedGroupUserMemberRef.current.style.display = "none";
    }
  }

  return (
    <div>
      <header>
        <h5>Create Group</h5>
      </header>
      <hr />
      <form action="">
        <div className={styles.flexedGroupProfileAndChangeBtn}>
          <p>Group Profile</p>
          <button>Change</button>
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
            <input type="text" name="" id="" />
          </div>
          <div className={styles.formGroupContent}>
            <label htmlFor="">Select members:</label>
            <input
              type="text"
              name="user"
              id="user"
              onChange={searchForGroupFriends}
            />
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
