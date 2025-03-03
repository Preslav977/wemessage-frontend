import styles from "./ChangeUserProfilePasswords.module.css";

import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { PasswordContext } from "../contexts/UserRegistrationContext";
import { useState, useContext } from "react";
import { passwordRegex } from "../utility/passwordRegex";
import { PopUpModalContext } from "../contexts/PopUpModalContext";
import { useNavigate } from "react-router-dom";
import PopUpModal from "./PopUpModal";

function ChangeUserProfilePasswords() {
  let [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  // console.log(userLogInObj);

  const [oldPassword, setOldPassword] = useState("");

  const { password, setPassword } = useContext(PasswordContext);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordErr, setOldPasswordErr] = useState("");

  const [popUpModal, setPopUpModal] = useContext(PopUpModalContext);

  const navigate = useNavigate();

  async function userUserPasswords(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const oldPassword = formData.get("old_password");

    const newPassword = formData.get("password");

    const confirmPassword = formData.get("confirm_password");

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

      if (response.status === 403) {
        navigate("/login");
      }

      if (response.status === 400) {
        setOldPasswordErr("Old password doesn't match.");
      } else {
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");

        setPopUpModal(true);

        setTimeout(() => {
          setPopUpModal(false);
        }, 3000);
      }

      const fetchLoggedInUserInformation = await fetch(
        "http://localhost:5000/users",
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      userLogInObj = await fetchLoggedInUserInformation.json();

      const userLoggedInInformation = {
        ...userLogInObj,
      };

      setUserLogInObj(userLoggedInInformation);
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
        <div className={styles.formGroupContent}>
          <label htmlFor="old_password">Enter old password:</label>
          <input
            type="password"
            minLength={8}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            name="old_password"
            id="old_password"
            data-testid="old_password"
            required
          />
        </div>
        {oldPasswordErr && (
          <span className={styles.error}>{oldPasswordErr}</span>
        )}
        <div className={styles.formGroupContent}>
          <label htmlFor="password">Enter new password:</label>
          <input
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            data-testid="password"
            required
          />
        </div>
        {!password.match(passwordRegex) && (
          <span className={styles.error}>
            Password must be 8 characters long, and contain one lower, one
            uppercase and one special character
          </span>
        )}
        <div className={styles.formGroupContent}>
          <label htmlFor="confirm_password">Confirm new password:</label>
          <input
            type="password"
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirm_password"
            id="confirm_password"
            data-testid="confirm_password"
            required
          />
        </div>
        {password !== confirmPassword && (
          <span className={styles.error}>Passwords must match</span>
        )}
      </div>
      {popUpModal && (
        <PopUpModal
          popUpModalBackgroundColor={"white"}
          popUpModalContentColor={"black"}
          popUpModalBorderColor={"white"}
          popUpModalContentHeader={"Profile updated"}
          popUpModalContentText={"Your passwords has been updated successfully"}
        />
      )}
    </form>
  );
}

export default ChangeUserProfilePasswords;
