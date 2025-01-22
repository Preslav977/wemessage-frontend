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
    const firstName = FormDataUserObject.get("first_name");
    const lastName = FormDataUserObject.get("last_name");
    const username = FormDataUserObject.get("username");
    const password = FormDataUserObject.get("password");
    const confirmPassword = FormDataUserObject.get("confirm_password");

    console.log(FormDataUserObject);

    const signUpAndCreateUser = {
      ...userSignUpObj,
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };

    setUserSignUpObj(signUpAndCreateUser);

    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          password: password,
          confirm_password: confirmPassword,
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
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formFlexedContainer}>
              <div className={styles.formContent}>
                <label htmlFor="first_name">First name:</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  minLength={1}
                  maxLength={30}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formContent}>
                <label htmlFor="last_name">Last name:</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  minLength={1}
                  maxLength={30}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.formContent}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                minLength={1}
                maxLength={30}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={styles.formContent}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.formContent}>
              <label htmlFor="confirm_password">Confirm password:</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <p className={styles.loginAnchorLink}>
              Already have an account?{" "}
              <Link to="http://localhost:5000/users/login">Log In</Link>
            </p>
            <div className={styles.submitBtnContainer}>
              <button className={styles.submitBtn}>Submit</button>
            </div>
          </form>
          <div className={styles.formRightSideFlexedContainer}>
            <img
              className={styles.formRightSideFlexedImage}
              src="wemessage.jpg"
              alt="wemessage"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUpFormComponent;
