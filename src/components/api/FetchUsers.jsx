import styles from "./FetchUsers.module.css";
import useUsersURL from "./custom hooks/useUsersURL";

function FetchUsers({ onClick, onChange }) {
  const { users, error, loading } = useUsersURL();

  if (loading) {
    return <img src="" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <>
      <div className={styles.fetchUsersContainer}>
        <h5>Search Users</h5>
        <img
          className={styles.closeAllUsersSvg}
          src="/close.svg"
          alt=""
          onClick={onClick}
        />
      </div>
      <input
        onChange={onChange}
        className={styles.searchForUsersInput}
        type="text"
        name=""
        id=""
      />
      <ul>
        {users.map((user) => (
          <li className={styles.flexedUsersLiContainer} key={user.id}>
            {user.profile_picture === "" ? (
              <img
                className={styles.usersImages}
                src="/default_user_pfp.svg"
                alt=""
              />
            ) : (
              <img
                className={styles.usersImages}
                src={user.profile_picture}
                alt=""
              />
            )}
            <div>
              <p>
                {user.first_name} {user.last_name}
              </p>

              <p>{"@" + user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FetchUsers;
