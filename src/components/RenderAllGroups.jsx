import styles from "./RenderAllGroups.module.css";
import useFetchGroupsURL from "./api/custom hooks/userFetchGroupsURL";
import { Link } from "react-router-dom";

function RenderAllGroups() {
  const { groups, error, loading } = useFetchGroupsURL();

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <>
      <header>
        <h4>Groups</h4>
        <Link to={"/groups/create"}>X</Link>
      </header>
      <>
        {groups.length === 0 ? (
          <p>{"You currently have no groups"}</p>
        ) : (
          <ul>
            {groups.map((group) => (
              <Link to={`/groups/${group.id}`} key={group.id}>
                <li className={styles.flexedLiGroupContainer}>
                  <div className={styles.groupImageContainer}>
                    <img
                      className={styles.groupImage}
                      src={group.group_image}
                      alt="group image"
                    />
                  </div>
                  <li>{group.group_name}</li>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </>
    </>
  );
}

export default RenderAllGroups;
