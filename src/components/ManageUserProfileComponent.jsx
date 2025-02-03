import styles from "./ManageUserProfileComponent.module.css";

function ManageUserProfileComponent() {
  return (
    <>
      <h2 className={styles.h2}>Manage Profile</h2>
      <nav>
        <ul>
          <li>
            <a href="">Profile</a>
          </li>
          <li>
            <a href="">Edit Profile</a>
          </li>
          <li>
            <a href="">Change Password</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default ManageUserProfileComponent;
