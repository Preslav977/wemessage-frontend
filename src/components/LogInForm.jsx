import styles from "./LogInForm.module.css";

import { Link } from "react-router-dom";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  UserNameContext,
  PasswordContext,
} from "../contexts/UserRegistrationContext";

import {
  UserLogInObjectContext,
  UserLoggedInContext,
} from "../contexts/UserLoggedInContext";

import { PopUpModalContext } from "../contexts/PopUpModalContext";

import PopUpModal from "./PopUpModal";

function LogInForm() {
  const { username, setUsername } = useContext(UserNameContext);

  const { password, setPassword } = useContext(PasswordContext);

  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserLoggedInContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [popUpModal, setPopUpModal] = useContext(PopUpModalContext);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        setUsername("");
        setPassword("");
      } else if (response.status === 401) {
        setError("Wrong username or password");

        setPopUpModal(true);
      }

      const result = await response.json();

      const bearerToken = `Bearer ${result.token}`;

      localStorage.setItem("token", bearerToken);

      setLoading(true);

      setIsUserLoggedIn(true);

      const fetchLoggedInUserInformation = await fetch(
        "http://localhost:5000/users",
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      const userLogInObj = await fetchLoggedInUserInformation.json();

      const userLoggedInInformation = {
        ...userLogInObj,
        userLogInObj,
      };

      setUserLogInObj(userLoggedInInformation);

      // setTimeout(() => {
      navigate(`/profile/${userLogInObj.id}`);
      // }, 3000);

      setPopUpModal(false);

      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleGuestLogin(e) {
    e.preventDefault();

    const guestUsername = "preslaw1";
    const guestPassword = "12345678Bg@";

    // setUsername(guestUsername);

    // setPassword(guestPassword);

    try {
      const response = await fetch("http://localhost:5000/users/login_guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: guestUsername,
          password: guestPassword,
        }),
      });

      const result = await response.json();

      const bearerToken = `Bearer ${result.token}`;

      localStorage.setItem("token", bearerToken);

      setLoading(true);

      setIsUserLoggedIn(true);

      const fetchLoggedInUserInformation = await fetch(
        "http://localhost:5000/users",
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      const userLogInObj = await fetchLoggedInUserInformation.json();

      const userLoggedInInformation = {
        ...userLogInObj,
        userLogInObj,
      };

      setUserLogInObj(userLoggedInInformation);

      // setTimeout(() => {
      navigate(`/profile/${userLogInObj.id}`);
      // }, 3000);

      setPopUpModal(false);
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
            src="/wemessage_logo.jpg"
            alt="wemessage"
          />
          <p className={styles.formHeaderName}>Wemessage</p>
        </div>
        <h1 className={styles.formHeader}>Log in</h1>
        <div className={styles.formFlexedContainer}>
          <form className={styles.formContainer} onSubmit={handleLogin}>
            <div className={styles.formContent}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                minLength={1}
                maxLength={30}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-testid="username"
                required
              />
              {error && <span className={styles.error}>{error}</span>}
              {username.length < 1 && (
                <span className={styles.error}>
                  Username is required to log in
                </span>
              )}
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
                data-testid="password"
                required
              />
              {password.length < 1 && (
                <span className={styles.error}>
                  Password is required to log in
                </span>
              )}
            </div>
            <p className={styles.signUpAnchorLink}>
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <div className={styles.submitBtnContainer}>
              {loading ? (
                <button data-testid="loading-btn" className={styles.submitBtn}>
                  Loading...{" "}
                  <img
                    className="loading"
                    src="/loading_spinner.svg"
                    alt="loading spinner"
                  />
                </button>
              ) : (
                <>
                  <button
                    className={styles.submitBtn}
                    type="submit"
                    onClick={handleGuestLogin}
                  >
                    Guest Login
                  </button>
                  <button className={styles.submitBtn}>Submit</button>
                </>
              )}
            </div>
          </form>
          <div className={styles.formRightSideFlexedContainer}>
            <img
              className={styles.formRightSideFlexedImage}
              src="/wemessage_logo.jpg"
              alt="wemessage"
            />
          </div>
        </div>
      </div>
      {popUpModal ? (
        <PopUpModal
          popUpModalBackgroundColor={"crimson"}
          popUpModalContentColor={"white"}
          popUpModalBorderColor={"crimson"}
          popUpModalContentText={"Wrong credentials"}
        />
      ) : (
        ""
      )}
    </main>
  );
}

export default LogInForm;
