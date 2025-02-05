import styles from "./EditUserProfile.module.css";

function EditUserProfile() {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.changeProfilePictureContainer}>
        <h3>Profile Picture</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* <input type="file" name="" id="" /> */}
          <label className={styles.editUserProfileLabel}>
            Edit
            <img
              className={styles.editUserProfileImage}
              src="/edit-profile.svg"
              alt=""
            />
            <input
              className={styles.editInputProfileImage}
              type="file"
              name=""
              id=""
            />
          </label>
        </form>
      </div>
      <div className={styles.userProfileContainer}>
        <div className={styles.flexedUserProfileContent}>
          <img
            className={styles.userProfileImage}
            src="/default-profile-image.svg"
            alt="user profile image"
          />
        </div>
      </div>
      <hr />
      <form>
        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <div className={styles.formInputGroup}>
              <label htmlFor="first_name">First name:</label>
              <input type="text" name="" id="" />
            </div>
            <div className={styles.formInputGroup}>
              <label htmlFor="last_name">Last name:</label>
              <input type="text" name="" id="" />
            </div>
            <div className={styles.formInputGroup}>
              <label htmlFor="username">Username:</label>
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className={styles.formTextareaGroup}>
            <label htmlFor="bio">Bio:</label>
            <textarea rows={8} name="" id=""></textarea>
          </div>
        </div>
        <div className={styles.submitBtnContainer}>
          <button className={styles.submitBtn}>save changes</button>
        </div>
      </form>
    </div>
  );
}

export default EditUserProfile;
