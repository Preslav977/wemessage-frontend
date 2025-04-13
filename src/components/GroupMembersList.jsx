import styles from "./GroupMembersList.module.css";

function GroupMembersList({ groupMembers, ref, onClick }) {
  return (
    <>
      {groupMembers.map((friend) => (
        <li
          data-testid="select_member"
          style={{
            display: "none",
          }}
          ref={ref}
          //   onClick={() => onClick(onClick)}
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
    </>
  );
}

export default GroupMembersList;
