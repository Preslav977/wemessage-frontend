import styles from "./ManageUserProfile.module.css";
import { Link } from "react-router-dom";

import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ManageUserProfile() {
  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const navigate = useNavigate();

  const { id } = useParams();

  function goBackToChats() {
    navigate("/chats");
  }

  if (userLogInObj.id !== Number(id)) {
    return (
      <nav className={styles.flexedUserNav}>
        <img
          onClick={goBackToChats}
          className={styles.goBackArrowSvg}
          src="/back-arrow.svg"
          alt="go to previous page"
        />
        <h2>User Profile</h2>
      </nav>
    );
  } else {
    return (
      <>
        <h2>Manage Profile</h2>
        <nav>
          <ul className={styles.ulFlexedLiContainer}>
            <li className={styles.liFlexedContent}>
              <Link data-testid="profile" to={`/profile/${userLogInObj.id}`}>
                Profile
              </Link>
            </li>
            <li className={styles.liFlexedContent}>
              <Link
                data-testid="edit_profile"
                to={`/profile/edit/${userLogInObj.id}`}
              >
                Edit Profile
              </Link>
            </li>
            <li className={styles.liFlexedContent}>
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
