import styles from "./ChangeUserProfilePasswords.module.css";

function ChangeUserProfilePasswords() {
  return (
    <form className={styles.sectionWrapper}>
      <header>
        <h3>Change Passwords</h3>
        <button>Save</button>
      </header>
      <hr />
      <div className={styles.formGroup}>
        <label htmlFor="old_password">Enter old password:</label>
        <input type="text" />
        <label htmlFor="new_password">Enter new password:</label>
        <input type="text" />
        <label htmlFor="confirm_new_password">Confirm new password:</label>
        <input type="text" />
      </div>
    </form>
  );
}

export default ChangeUserProfilePasswords;
