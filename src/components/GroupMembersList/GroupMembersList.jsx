import styles from "./GroupMembersList.module.css";
import PropTypes from "prop-types";

function GroupMembersList({ groupMembers, onClick }) {
  return (
    <>
      {groupMembers.map((friend) => (
        <li
          style={{
            display: "flex",
          }}
          key={friend.id}
          className={styles.flexedLiDropDownUsersContainer}
          data-testid="select_member"
          onClick={() => onClick(friend)}
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
            <p className={styles.userFirstAndLastName}>
              {friend.first_name} {friend.last_name}
            </p>

            <p className={styles.userUsername}>{"@" + friend.username}</p>
          </div>
        </li>
      ))}
    </>
  );
}

GroupMembersList.propTypes = {
  groupMembers: PropTypes.array,
  onClick: PropTypes.func,
};

export default GroupMembersList;
