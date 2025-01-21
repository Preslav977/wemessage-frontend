import styles from "./SignUpFormComponent.module.css";

import { Link } from "react-router-dom";

import { useContext } from "react";

import {
  FirstNameContext,
  LastNameContext,
  UserNameContext,
  PasswordContext,
  ConfirmPasswordContext,
  BioContext,
  ProfilePictureContext,
  BackgroundPictureContext,
  UserSignUpObjectContext,
} from "../contexts/UserRegistrationContext";

function SignUpFormComponent() {
  const { firstName, setFirstName } = useContext(FirstNameContext);

  const { lastName, setLastName } = useContext(LastNameContext);

  const { username, setUsername } = useContext(UserNameContext);

  const { password, setPassword } = useContext(PasswordContext);

  const { confirmPassword, setConfirmPassword } = useContext(
    ConfirmPasswordContext,
  );

  const { bio, setBio } = useContext(BioContext);

  const { profilePicture, setProfilePicture } = useContext(
    ProfilePictureContext,
  );

  const { backgroundPicture, setBackgroundPicture } = useContext(
    BackgroundPictureContext,
  );

  const { userSignUpObj, setUserSignUpObj } = useContext(
    UserSignUpObjectContext,
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const FormDataUserObject = new FormData(e.target);

    console.log(FormDataUserObject);

    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //
        }),
      });

      const result = await response.json();

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.formContainerWrapper}>
        <div className={styles.formContainerHeader}>
          <img
            className={styles.formHeaderImage}
            src="wemessage.jpg"
            alt="wemessage"
          />
          <p className={styles.formHeaderName}>Wemessage</p>
        </div>
        <h1 className={styles.formHeader}>Sign up</h1>
        <div className={styles.formFlexedContainer}>
          <form className={styles.formContainer}>
            <div className={styles.formFlexedContainer}>
              <div className={styles.formContent}>
                <label htmlFor="">First name:</label>
                <input type="text" name="" id="" />
              </div>

              <div className={styles.formContent}>
                <label htmlFor="">Last name:</label>
                <input type="text" name="" id="" />
              </div>
            </div>

            <div className={styles.formContent}>
              <label htmlFor="">Username:</label>
              <input type="text" name="" id="" />
            </div>

            <div className={styles.formContent}>
              <label htmlFor="">Password:</label>
              <input type="password" name="" id="" />
            </div>

            <div className={styles.formContent}>
              <label htmlFor="">Confirm password:</label>
              <input type="password" name="" id="" />
            </div>
            <p className={styles.loginAnchorLink}>
              Already have an account? <a href="/login">Log In</a>
            </p>
            <div className={styles.submitBtnContainer}>
              <button className={styles.submitBtn}>Submit</button>
            </div>
          </form>
          <div className={styles.formRightSideFlexedContainer}>
            <img
              className={styles.formRightSideFlexedImage}
              src="wemessage.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUpFormComponent;
