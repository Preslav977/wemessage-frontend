import styles from "./ManageUserProfile.module.css";
import { Link } from "react-router-dom";

import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

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
        <h3 className={styles.manageProfileHeader}>Manage Profile</h3>
        <nav>
          <ul className={styles.ulFlexedLiContainer}>
            <li
              style={{
                backgroundColor: currentPath === "/profile/" ? "blue" : "",
              }}
              className={styles.liFlexedContent}
            >
              <Link data-testid="profile" to={`/profile/${userLogInObj.id}`}>
                Profile
              </Link>
            </li>
            <li
              style={{
                backgroundColor: currentPath === "/profile/edit/" ? "blue" : "",
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
                  currentPath === "/profile/change_passwords/" ? "blue" : "",
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

export default ManageUserProfile;
