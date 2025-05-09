import styles from "./UpdateUserPasswords.module.css";

import { Link } from "react-router-dom";

import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { PasswordContext } from "../../contexts/UserRegistrationContext";
import { useState, useContext } from "react";
import { passwordRegex } from "../../utility/passwordRegex";

import PopUpModal from "../PopUpModal/PopUpModal";
import localhostURL from "../../utility/localhostURL";

function UpdateUserPasswords() {
  let [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const [oldPassword, setOldPassword] = useState("");

  const { password, setPassword } = useContext(PasswordContext);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordErr, setOldPasswordErr] = useState("");

  const [showPopUpModalUpdatedPasswords, setShowPopUpModalUpdatedPasswords] =
    useState(false);

  const [showPopUpModalOnExpiredToken, setShowPopUpModalOnExpiredToken] =
    useState(false);

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
        `${localhostURL}/users/profile/change_passwords/${userLogInObj.id}`,
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
        setShowPopUpModalOnExpiredToken(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalOnExpiredToken(false);
        }, 3000);
      }
      if (response.status === 400) {
        setOldPasswordErr("Old password doesn't match.");
      } else {
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");

        setShowPopUpModalUpdatedPasswords(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalUpdatedPasswords(false);
        }, 3000);
      }

      const result = await response.json();

      console.log(result);

      const userLoggedInInformation = {
        ...userLogInObj,
        password: result.password,
      };

      setUserLogInObj(userLoggedInInformation);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={userUserPasswords} className={styles.sectionWrapper}>
      <Link
        className={styles.userProfileAnchor}
        to={`/profile/${userLogInObj.id}`}
      >
        <img
          className={styles.useProfileAnchorImg}
          src="/back-arrow.svg"
          alt="go back to user profile"
        />
      </Link>
      <hr className={styles.sectionWrapperTopHr} />
      <header className={styles.sectionWrapperHeaderContainer}>
        <h3 className={styles.sectionWrapperHeader}>Change Password</h3>
        <div>
          <button
            disabled={userLogInObj.role === "GUEST" ? true : false}
            className={styles.sectionWrapperSaveBtn}
            type="submit"
          >
            Save
          </button>
        </div>
      </header>
      <hr className={styles.sectionWrapperBottomHr} />
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
      {showPopUpModalUpdatedPasswords && (
        <PopUpModal
          popUpModalBackgroundColor={"white"}
          popUpModalContentColor={"black"}
          popUpModalBorderColor={"white"}
          popUpModalContentHeader={"Profile Updated"}
          popUpModalContentText={"Your passwords has been updated successfully"}
        />
      )}
      {showPopUpModalOnExpiredToken && (
        <PopUpModal
          popUpModalBackgroundColor={"red"}
          popUpModalContentColor={"white"}
          popUpModalBorderColor={"red"}
          popUpModalContentHeader={"Token expired"}
          popUpModalContentText={"Token has expired login again to continue!"}
        />
      )}
    </form>
  );
}

export default UpdateUserPasswords;
