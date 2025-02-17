import styles from "./ChangeUserProfilePasswords.module.css";

import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { PasswordContext } from "../contexts/UserRegistrationContext";
import { useState, useContext } from "react";
import { passwordRegex } from "../utility/passwordRegex";

function ChangeUserProfilePasswords() {
  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  console.log(userLogInObj);

  const [oldPassword, setOldPassword] = useState("");

  const { password, setPassword } = useContext(PasswordContext);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordErr, setOldPasswordErr] = useState("");

  async function userUserPasswords(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const oldPassword = formData.get("old_password");

    const newPassword = formData.get("password");

    const confirmPassword = formData.get("confirm_password");

    console.log(formData);

    const updateUserLoggedInObject = {
      ...userLogInObj,
      password: password,
    };

    setUserLogInObj(updateUserLoggedInObject);

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
          type="password"
          minLength={8}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          name="old_password"
          id="old_password"
        />
        <label htmlFor="password">Enter new password:</label>
        <input
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
        {!password.match(passwordRegex) && (
          <span className={styles.error}>
            Password must be 8 characters long, and contain one lower, one
            uppercase and one special character
          </span>
        )}
        <label htmlFor="confirm_password">Confirm new password:</label>
        <input
          type="password"
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirm_password"
          id="confirm_password"
        />
        {password !== confirmPassword && (
          <span className={styles.error}>Passwords must match</span>
        )}
      </div>
    </form>
  );
}

export default ChangeUserProfilePasswords;
