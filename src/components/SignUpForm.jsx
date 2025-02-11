import styles from "./SignUpForm.module.css";

import { Link } from "react-router-dom";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FirstNameContext,
  LastNameContext,
  UserNameContext,
  PasswordContext,
  ConfirmPasswordContext,
  UserSignUpObjectContext,
} from "../contexts/UserRegistrationContext";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function SignUpForm() {
  const { firstName, setFirstName } = useContext(FirstNameContext);

  const { lastName, setLastName } = useContext(LastNameContext);

  const { username, setUsername } = useContext(UserNameContext);

  const { password, setPassword } = useContext(PasswordContext);

  const { confirmPassword, setConfirmPassword } = useContext(
    ConfirmPasswordContext,
  );

  const { userSignUpObj, setUserSignUpObj } = useContext(
    UserSignUpObjectContext,
  );

  const [firstNameError, setFirstNameError] = useState("");

  const [lastNameError, setLastNameError] = useState("");

  const [usernameError, setUsernameError] = useState("");

  const navigate = useNavigate();

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

      if (response.status === 200) {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login");
      } else {
        const result = await response.json();

        result.map((err) => {
          if (err.msg === "First name is already taken") {
            setFirstNameError(err.msg);
          } else if (err.msg === "Last name is already taken") {
            setLastNameError(err.msg);
          } else {
            setUsernameError(err.msg);
          }
        });
      }

      // console.log(result);
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
            src="wemessage_logo.jpg"
            alt="wemessage"
          />
          <p className={styles.formHeaderName}>Wemessage</p>
        </div>
        <h1 className={styles.formHeader}>Sign up</h1>
        <div className={styles.formFlexedContainer}>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formFlexedContainer}>
              <div className={styles.formContent}>
                <label htmlFor="first_name">
                  First name: <span className={styles.error}>*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  minLength={1}
                  maxLength={30}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  role="first_name"
                  required
                />
                {firstName.length < 1 && (
                  <span className={styles.error}>
                    First name must be between 1 and 30 characters
                  </span>
                )}
                {firstNameError && (
                  <span className={styles.error}>{firstNameError}</span>
                )}
              </div>

              <div className={styles.formContent}>
                <label htmlFor="last_name">
                  Last name: <span className={styles.error}>*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  minLength={1}
                  maxLength={30}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  role="last_name"
                  required
                />
                {lastName.length < 1 && (
                  <span className={styles.error}>
                    Last name must be between 1 and 30 characters
                  </span>
                )}
                {lastNameError && (
                  <span className={styles.error}>{lastNameError}</span>
                )}
              </div>
            </div>
            <div className={styles.formContent}>
              <label htmlFor="username">
                Username: <span className={styles.error}>*</span>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                minLength={1}
                maxLength={30}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                role="username"
                required
              />
              {username.length < 1 && (
                <span className={styles.error}>
                  Username must be between 1 and 30 characters
                </span>
              )}
              {usernameError && (
                <span className={styles.error}>{usernameError}</span>
              )}
            </div>

            <div className={styles.formContent}>
              <label htmlFor="password">
                Password: <span className={styles.error}>*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                role="password"
                required
              />
              {!password.match(passwordRegex) && (
                <span className={styles.error}>
                  Password must be 8 characters long, and contain one lower, one
                  uppercase and one special character
                </span>
              )}
            </div>

            <div className={styles.formContent}>
              <label htmlFor="confirm_password">
                Confirm Password: <span className={styles.error}>*</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                role="confirm_password"
                required
              />
              {password !== confirmPassword && (
                <span className={styles.error}>Passwords must match</span>
              )}
            </div>
            <p className={styles.loginAnchorLink}>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
            <div className={styles.submitBtnContainer}>
              <button className={styles.submitBtn}>Submit</button>
            </div>
          </form>
          <div className={styles.formRightSideFlexedContainer}>
            <img
              className={styles.formRightSideFlexedImage}
              src="wemessage_logo.jpg"
              alt="wemessage"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUpForm;
