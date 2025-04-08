import styles from "./MainGridInterface.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { globalChatId } from "../../utility/globalChatId";

import { UserLoggedInContext } from "../../contexts/UserLoggedInContext";
import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { useContext, useEffect, useState } from "react";

function MainGridInterface({
  leftGridComponent,
  rightGridComponent,
  currentPath,
}) {
  const [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserLoggedInContext);

  const useDeviceSize = () => {
    const [width, setWidth] = useState(0);

    const handleWindowSize = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      handleWindowSize();

      window.addEventListener("resize", handleWindowSize);

      return () => window.removeEventListener("resize", handleWindowSize);
    }, []);

    return [width];
  };

  function userLogOut() {
    setIsUserLoggedIn(false);

    localStorage.clear();
  }

  const [width] = useDeviceSize();

  return (
    <>
      <main className={styles.mainGridContainer}>
        <aside
          style={{
            display: width <= 640 ? "none" : "block",
          }}
          className={styles.asideMainNavigationContainer}
        >
          <nav className={styles.mainNavigation}>
            <ul className={styles.ulLinkContainer}>
              <li className={styles.liFlexedImgAnchorContainer}>
                <Link
                  data-testid="global_chat"
                  className={styles.anchorFlexedImgContainer}
                  to={`/globalChat/${globalChatId}`}
                >
                  <img
                    className={styles.mainNavigationSvg}
                    src="/global_chat.svg"
                    alt="global chat"
                  />
                  <span className={styles.anchorFlexedSpan}>Global</span>
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
                  <span className={styles.anchorFlexedSpan}>Chats</span>
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
                  <span className={styles.anchorFlexedSpan}>Groups</span>
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
                    alt="user profile"
                  />
                  <span className={styles.anchorFlexedSpan}>Profile</span>
                </Link>
              </li>
              <li
                onClick={userLogOut}
                className={styles.liFlexedImgAnchorContainer}
              >
                <Link
                  data-testid="logout"
                  className={styles.anchorFlexedImgContainer}
                  to="/login"
                >
                  <img
                    className={styles.mainNavigationSvg}
                    src="/logout.svg"
                    alt="user logout"
                  />
                  <span className={styles.anchorFlexedSpan}>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <section
          style={{
            display:
              currentPath === "/chats" ||
              currentPath === "/groups" ||
              (currentPath !== "/groups" && width >= 640) ||
              (currentPath !== "/chats" && width >= 640)
                ? "block"
                : "none",
          }}
          className={styles.mainGridSection}
        >
          {leftGridComponent}
        </section>
        <section
          style={{
            display:
              (currentPath === "/chats" && width >= 640) ||
              currentPath === "/chats/" ||
              (currentPath === "/groups" && width >= 640) ||
              currentPath === "/groups/" ||
              currentPath === "/profile/" ||
              currentPath === "/profile/edit/" ||
              currentPath === "/profile/change_passwords/" ||
              currentPath === "/globalChat/"
                ? "flex"
                : "none",
          }}
          className={styles.secondaryGridSection}
        >
          {rightGridComponent}
        </section>
      </main>
      <footer className={styles.footerMobileNavigation}>
        <nav>
          <ul className={styles.ulLinkContainer}>
            <li className={styles.liFlexedImgAnchorContainer}>
              <Link
                data-testid="global_chat"
                className={styles.anchorFlexedImgContainer}
                to={`/globalChat/${globalChatId}`}
              >
                <img
                  className={styles.mainNavigationSvg}
                  src="/global_chat.svg"
                  alt="global chat"
                />
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
              </Link>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <Link
                data-testid="profile"
                className={styles.anchorFlexedImgContainer}
                to={`/profile/${userLogInObj.id}`}
              >
                <img
                  className={styles.mainNavigationSvg}
                  src="/profile.svg"
                  alt="user profile"
                />
              </Link>
            </li>
            <li
              onClick={userLogOut}
              className={styles.liFlexedImgAnchorContainer}
            >
              <Link
                data-testid="logout"
                className={styles.anchorFlexedImgContainer}
                to="/login"
              >
                <img
                  className={styles.mainNavigationSvg}
                  src="/logout.svg"
                  alt="user logout"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

MainGridInterface.propTypes = {
  leftGridComponent: PropTypes.object,
  rightGridComponent: PropTypes.object,
  currentPath: PropTypes.string,
};

export default MainGridInterface;
