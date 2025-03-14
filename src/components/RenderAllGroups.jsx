import styles from "./RenderAllGroups.module.css";
import useFetchGroupsAndGroupsById from "./api/custom hooks/useFetchGroupsAndGroupsById";
import useFetchGroupsURL from "./api/custom hooks/userFetchGroupsURL";
import { Link } from "react-router-dom";
import { useState } from "react";

function RenderAllGroups() {
  // const { groups } = useFetchGroupsAndGroupsById();

  // console.log(groups);

  const { groups, error, loading } = useFetchGroupsURL();

  console.log(groups);

  // const { groups, error, loading } = useFetchGroupsURL();

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
        <Link to={"/groups/create"}>X</Link>
      </header>
      <>
        {groups.length === 0 ? (
          <p>{"You currently have no groups"}</p>
        ) : (
          <>
            <ul>
              {groups.map((group) => (
                <Link to={`/groups/${group.id}`} key={group.id}>
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
