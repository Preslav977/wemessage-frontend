import styles from "./UserProfileComponent.module.css";

function UserProfileComponent() {
  return (
    <>
      <div className={styles.userBgContainer}>
        <img
          className={styles.userBgImg}
          src="/user-default-bg-image.jpg"
          alt="user background image"
        />
        <div className={styles.userProfileContainer}>
          <img
            className={styles.userProfileImg}
            src="/default-profile-image.svg"
            alt="user profile image"
          />
        </div>
        <div className={styles.changeBgImgContainer}>
          <form action="">
            <input
              className={styles.changeBgImgInput}
              type="file"
              name=""
              id=""
            />
          </form>
          <img
            className={styles.changeBgImg}
            src="/edit-profile-image.svg"
            alt="change user background image"
          />
        </div>
        <div className={styles.userPresenceStatus}></div>
      </div>
      <div className={styles.userCredentials}>
        <div>
          <p>User Name</p>
          <p>@user</p>
        </div>
        <li>
          <a className={styles.editProfileAnchor} href="/profile/edit/4">
            Edit Profile
          </a>
        </li>
      </div>
    </>
  );
}

export default UserProfileComponent;
