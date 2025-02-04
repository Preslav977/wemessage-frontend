import styles from "./ManageUserProfileComponent.module.css";

function ManageUserProfileComponent() {
  return (
    <>
      <h2>Manage Profile</h2>
      <nav>
        <ul className={styles.ulFlexedLiContainer}>
          <li className={styles.liFlexedContent}>
            <a href="">Profile</a>
          </li>
          <li className={styles.liFlexedContent}>
            <a href="">Edit Profile</a>
          </li>
          <li className={styles.liFlexedContent}>
            <a href="">Change Password</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default ManageUserProfileComponent;
