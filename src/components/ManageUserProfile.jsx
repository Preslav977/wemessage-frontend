import styles from "./ManageUserProfile.module.css";
import { Link } from "react-router-dom";

import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext } from "react";

function ManageUserProfile() {
  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  return (
    <>
      <h2>Manage Profile</h2>
      <nav>
        <ul className={styles.ulFlexedLiContainer}>
          <li className={styles.liFlexedContent}>
            <Link to={`/profile/${userLogInObj.id}`}>Profile</Link>
          </li>
          <li className={styles.liFlexedContent}>
            <Link to={`/profile/edit/${userLogInObj.id}`}>Edit Profile</Link>
          </li>
          <li className={styles.liFlexedContent}>
            <Link to={`/profile/change_passwords/${userLogInObj.id}`}>
              Change Password
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default ManageUserProfile;
