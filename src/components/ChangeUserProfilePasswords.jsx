import styles from "./ChangeUserProfilePasswords.module.css";

import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { PasswordContext } from "../contexts/UserRegistrationContext";
import { useState, useContext } from "react";

function ChangeUserProfilePasswords() {
  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const [oldPassword, setOldPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const { password, setPassword } = useContext(PasswordContext);

  async function userUserPasswords(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const oldPassword = formData.get("old_password");

    const newPassword = formData.get("password");

    const confirmPassword = formData.get("confirm_password");

    console.log(formData);

    try {
      const response = await fetch(
        `http://localhost:5000/users/profile/change_passwords/${userLogInObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            old_password: oldPassword,
            password: newPassword,
            confirm_password: confirmPassword,
          }),
        },
      );
      const result = await response.json();

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={userUserPasswords} className={styles.sectionWrapper}>
      <header>
        <h3>Change Passwords</h3>
        <button type="submit">Save</button>
      </header>
      <hr />
      <div className={styles.formGroup}>
        <label htmlFor="old_password">Enter old password:</label>
        <input
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="password"
          name="old_password"
          id="old_password"
        />
        <label htmlFor="password">Enter new password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
        />
        <label htmlFor="confirm_password">Confirm new password:</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirm_password"
          id="confirm_password"
        />
      </div>
    </form>
  );
}

export default ChangeUserProfilePasswords;
