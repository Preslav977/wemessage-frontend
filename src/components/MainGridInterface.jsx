import styles from "./MainGridInterface.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { UserLoggedInContext } from "../contexts/UserLoggedInContext";
import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext } from "react";

function MainGridInterface({ leftGridComponent, rightGridComponent }) {
  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserLoggedInContext);

  function logout() {
    setIsUserLoggedIn(false);

    localStorage.clear();
  }

  return (
    <main className={styles.mainGridContainer}>
      <aside className={styles.asideMainNavigationContainer}>
        <nav className={styles.mainNavigation}>
          <ul className={styles.ulLinkContainer}>
            <li className={styles.liFlexedImgAnchorContainer}>
              <Link
                data-testid="global_chat"
                className={styles.anchorFlexedImgContainer}
                to="/global/:id"
              >
                <img
                  className={styles.mainNavigationSvg}
                  src="/global_chat.svg"
                  alt="global chat"
                />
                Global
              </Link>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <Link
                data-testid="chats"
                className={styles.anchorFlexedImgContainer}
                to="/chats"
              >
                <img
                  className={styles.mainNavigationSvg}
                  src="/chats.svg"
                  alt="chats (conversations)"
                />
                Chats
              </Link>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <Link
                data-testid="groups"
                className={styles.anchorFlexedImgContainer}
                to="/groups"
              >
                <img
                  className={styles.mainNavigationSvg}
                  src="/groups.svg"
                  alt="groups"
                />
                Groups
              </Link>
            </li>
          </ul>
          <ul>
            <li className={styles.liFlexedImgAnchorContainer}>
              <Link
                data-testid="profile"
                className={styles.anchorFlexedImgContainer}
                to={`/profile/${userLogInObj.id}`}
              >
                <img
                  className={styles.mainNavigationSvg}
                  src="/profile.svg"
                  alt="profile"
                />
                Profile
              </Link>
            </li>
            <li onClick={logout} className={styles.liFlexedImgAnchorContainer}>
              <Link
                data-testid="logout"
                className={styles.anchorFlexedImgContainer}
                to="/login"
              >
                <img
                  className={styles.mainNavigationSvg}
                  src="/logout.svg"
                  alt="logout"
                />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <section className={styles.mainGridSection}>{leftGridComponent}</section>
      <section className={styles.secondaryGridSection}>
        {rightGridComponent}
      </section>
    </main>
  );
}

MainGridInterface.propTypes = {
  leftGridComponent: PropTypes.object,
  rightGridComponent: PropTypes.object,
};

export default MainGridInterface;
