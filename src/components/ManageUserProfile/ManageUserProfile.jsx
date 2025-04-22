import styles from "./ManageUserProfile.module.css";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";

function ManageUserProfile({ currentPath }) {
  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const { id } = useParams();

  if (userLogInObj.id !== Number(id)) {
    return (
      <nav className={styles.flexedUserNav}>
        <Link to={"/chats"} data-testid="backArrow">
          <img
            className={styles.goBackArrowSvg}
            src="/back-arrow.svg"
            alt="go to previous page"
          />
        </Link>
        <h2 className={styles.userProfileHeader}>User Profile</h2>
      </nav>
    );
  } else {
    return (
      <>
        <h2 className={styles.manageProfileHeader}>Manage Profile</h2>
        <nav>
          <ul className={styles.ulFlexedLiContainer}>
            <li
              style={{
                backgroundColor: currentPath === "/profile/" ? "#393a3b" : "",
              }}
              className={styles.liFlexedContent}
            >
              <Link data-testid="profile" to={`/profile/${userLogInObj.id}`}>
                Profile
              </Link>
            </li>
            <li
              style={{
                backgroundColor:
                  currentPath === "/profile/edit/" ? "#393a3b" : "",
              }}
              className={styles.liFlexedContent}
            >
              <Link
                data-testid="edit_profile"
                to={`/profile/edit/${userLogInObj.id}`}
              >
                Edit Profile
              </Link>
            </li>
            <li
              style={{
                backgroundColor:
                  currentPath === "/profile/change_passwords/" ? "#393a3b" : "",
              }}
              className={styles.liFlexedContent}
            >
              <Link
                data-testid="change_password"
                to={`/profile/change_passwords/${userLogInObj.id}`}
              >
                Change Password
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

ManageUserProfile.propTypes = {
  currentPath: PropTypes.string,
};

export default ManageUserProfile;
