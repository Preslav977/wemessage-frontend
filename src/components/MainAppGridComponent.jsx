import styles from "./MainAppGridComponent.module.css";

function MainAppGridComponent() {
  return (
    <main className={styles.mainGridContainer}>
      <aside className={styles.asideMainNavigationContainer}>
        <nav className={styles.mainNavigation}>
          <ul className={styles.ulLinkContainer}>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="global-chat.svg"
                alt=""
              />
              <a href="">Global</a>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="chats.svg"
                alt=""
              />
              <a href="">Chats</a>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="groups.svg"
                alt=""
              />
              <a href="">Groups</a>
            </li>
          </ul>
          <ul>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="profile.svg"
                alt=""
              />
              <a href="">Profile</a>
            </li>
            <li className={styles.liFlexedImgAnchorContainer}>
              <img
                className={styles.mainNavigationSvg}
                src="logout.svg"
                alt=""
              />
              <a href="">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>
      <section className={styles.mainGridSection}></section>
      <section className={styles.secondaryGridSection}></section>
    </main>
  );
}

export default MainAppGridComponent;
