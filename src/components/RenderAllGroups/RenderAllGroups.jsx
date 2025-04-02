import styles from "./RenderAllGroups.module.css";
import useFetchGroupsURL from "../api/custom hooks/userFetchGroupsURL";
import { Link } from "react-router-dom";

function RenderAllGroups() {
  const { groups, error, loading } = useFetchGroupsURL();

  if (loading) {
    return <img src="/loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <>
      <header>
        <h4>Groups</h4>
        <Link data-testid="groupAnchor" to={"/groups/create"}>
          X
        </Link>
      </header>
      <>
        {groups.length === 0 ? (
          <p>{"You currently have no groups"}</p>
        ) : (
          <>
            <ul>
              {groups.map((group) => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <div className={styles.flexedLiGroupContainer}>
                    <div className={styles.groupImageContainer}>
                      <img
                        className={styles.groupImage}
                        src={group.group_image}
                        alt="group image"
                      />
                    </div>
                    <li>{group.group_name}</li>
                  </div>
                </Link>
              ))}
            </ul>
          </>
        )}
      </>
    </>
  );
}

export default RenderAllGroups;
