import styles from "./GroupMembersList.module.css";
import PropTypes from "prop-types";

function GroupMembersList({ groupMembers, onClick }) {
  return (
    <>
      {groupMembers.map((member) => (
        <li
          style={{
            display: "flex",
          }}
          key={member.id}
          className={styles.flexedLiDropDownUsersContainer}
          data-testid="select_member"
          onClick={() => onClick(member)}
        >
          {member.profile_picture === "" ? (
            <img
              className={styles.dropDownUserMemberImg}
              src="/default_user_pfp.svg"
              alt="default user profile picture"
            />
          ) : (
            <img
              className={styles.userProfilePicture}
              src={member.profile_picture}
              alt="user profile picture"
            />
          )}
          <div>
            <p className={styles.userFirstAndLastName}>
              {member.first_name} {member.last_name}
            </p>

            <p className={styles.userUsername}>{"@" + member.username}</p>
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
