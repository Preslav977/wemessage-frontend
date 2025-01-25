import styles from "./LogInFormComponent.module.css";

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

function LogInFormComponent() {
  const { username, setUsername } = useContext(UserNameContext);

  const { password, setPassword } = useContext(PasswordContext);

  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserLoggedInContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

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

      if (response.status === 401) {
        setError("Wrong username or password");
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

      setTimeout(() => {
        navigate("/signup");
      }, 3000);

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
        <h1 className={styles.formHeader}>Log in</h1>
        <div className={styles.formFlexedContainer}>
          <form className={styles.formContainer} onSubmit={handleLogin}>
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
                role="username"
                required
              />
              {error && <span className={styles.error}>{error}</span>}
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
                role="password"
                required
              />
            </div>
            <p className={styles.signUpAnchorLink}>
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <div className={styles.submitBtnContainer}>
              {loading ? (
                <button className={styles.submitBtn}>
                  Loading... <img className="loading" src="loader.svg" alt="" />
                </button>
              ) : (
                <button className={styles.submitBtn}>Submit</button>
              )}
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

export default LogInFormComponent;
