import { Link } from "react-router-dom";
import styles from "./FetchAndSearchForUsers.module.css";
import useFetchUsersURL from "./custom hooks/useFetchUsersURL";
import PropTypes from "prop-types";

function FetchAndSearchForUsers({ onClick, onChange }) {
  const { users, error, loading } = useFetchUsersURL();

  if (loading) {
    // return <img src="./loading_spinner.svg" alt="Loading..." />;

    return (
      <svg
        version="1.1"
        id="L7"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        xmlSpace="preserve"
      >
        Loading...
        <path
          fill="#fff"
          d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="2s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
        <path
          fill="#fff"
          d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          />
        </path>
        <path
          fill="#fff"
          d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
L82,35.7z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="2s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );
  }

  if (error) {
    return <p className={styles.errorParagraph}>Failed to fetch users!</p>;
  }

  return (
    <>
      <header className={styles.fetchUsersHeader}>
        <h4 className={styles.fetchUsersSubHeader}>Search Users</h4>
        <img
          className={styles.closeSearchForUsersSvg}
          src="/open.svg"
          alt="type to search for a user"
          onClick={onClick}
        />
      </header>
      <input
        data-testid="user"
        onChange={onChange}
        className={styles.searchForUsersInput}
        type="text"
        name="user"
        id="user"
      />
      <ul className={styles.ulFlexedLiUsersContainer}>
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/profile/${user.id}`}
            data-testid="userAnchor"
          >
            <li className={styles.flexedNestedLiUsersContainer}>
              {user.profile_picture === "" ? (
                <div
                  className={
                    styles.userProfilePictureAndOnlinePresenceContainer
                  }
                >
                  <img
                    className={styles.userProfilePicture}
                    src="/default_user_pfp.svg"
                    alt="user default profile picture"
                  />
                  <div>
                    {user.online_presence === "ONLINE" ? (
                      <div
                        data-testid="user_presence"
                        className={styles.userPresenceStatus}
                        style={{ backgroundColor: "lightgreen" }}
                      ></div>
                    ) : (
                      <div
                        data-testid="user_presence"
                        className={styles.userPresenceStatus}
                        style={{ backgroundColor: "lightgray" }}
                      ></div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    styles.userProfilePictureAndOnlinePresenceContainer
                  }
                >
                  <img
                    className={styles.userProfilePicture}
                    src={user.profile_picture}
                    alt="user default profile picture"
                  />
                  <div>
                    {user.online_presence === "ONLINE" ? (
                      <div
                        data-testid="user_presence"
                        className={styles.userPresenceStatus}
                        style={{ backgroundColor: "lightgreen" }}
                      ></div>
                    ) : (
                      <div
                        data-testid="user_presence"
                        className={styles.userPresenceStatus}
                        style={{ backgroundColor: "lightgray" }}
                      ></div>
                    )}
                  </div>
                </div>
              )}
              <div>
                <p className={styles.userFirstAndLastName}>
                  {user.first_name} {user.last_name}
                </p>

                <p className={styles.userUsername}>{"@" + user.username}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

FetchAndSearchForUsers.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

export default FetchAndSearchForUsers;
