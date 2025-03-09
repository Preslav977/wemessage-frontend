import { Link } from "react-router-dom";
import styles from "./FetchAndSearchForUsers.module.css";
import useFetchUsersURL from "./custom hooks/useFetchUsersURL";
import PropTypes from "prop-types";

function FetchAndSearchForUsers({ onClick, onChange }) {
  const { users, error, loading } = useFetchUsersURL();

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <>
      <header className={styles.fetchUsersHeader}>
        <h5>Search Users</h5>
        <img
          className={styles.closeSearchForUsersSvg}
          src="/close.svg"
          alt="type to search for a user"
          onClick={onClick}
        />
      </header>
      <input
        onChange={onChange}
        className={styles.searchForUsersInput}
        type="text"
        name="user"
        id="user"
      />
      <ul>
        {users.map((user) => (
          <Link to={`/profile/${user.id}`} key={user.id}>
            <li className={styles.flexedNestedLiUsersContainer}>
              {user.profile_picture === "" ? (
                <img
                  className={styles.userProfilePicture}
                  src="/default_user_pfp.svg"
                  alt="default user profile picture"
                />
              ) : (
                <img
                  className={styles.userProfilePicture}
                  src={user.profile_picture}
                  alt="user profile picture"
                />
              )}
              <div>
                <p>
                  {user.first_name} {user.last_name}
                </p>

                <p>{"@" + user.username}</p>
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
