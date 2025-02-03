import styles from "./MainAppGridComponent.module.css";

function MainAppGridComponent({ left, right }) {
  return (
    <main className={styles.mainGridContainer}>
      <aside className={styles.asideMainNavigationContainer}>
        <nav className={styles.mainNavigation}>
          <ul className={styles.ulLinkContainer}>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="/global-chat.svg"
                alt="global chat"
              />
              <a href="/global/:id">Global</a>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="/chats.svg"
                alt="chats (conversations)"
              />
              <a href="/chats">Chats</a>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="/groups.svg"
                alt="groups"
              />
              <a href="/groups">Groups</a>
            </li>
          </ul>
          <ul>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="/profile.svg"
                alt="profile"
              />
              <a href="/profile/4">Profile</a>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="/logout.svg"
                alt="logout"
              />
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>
      <section className={styles.mainGridSection}>{left}</section>
      <section className={styles.secondaryGridSection}>{right}</section>
    </main>
  );
}

export default MainAppGridComponent;
