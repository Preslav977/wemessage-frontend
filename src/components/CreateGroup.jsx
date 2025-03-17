import styles from "./CreateGroup.module.css";
import { GroupFriendsContext } from "../contexts/GroupsContext";
import { useContext } from "react";

function CreateGroup() {
  const [groupFriends, setGroupFriends] = useContext(GroupFriendsContext);

  console.log(groupFriends);

  return (
    <div>
      <header>
        <h5>Create Group</h5>
      </header>
      <hr />
      <form action="">
        <div className={styles.flexedGroupProfileAndChangeBtn}>
          <p>Group Profile</p>
          <button>Change</button>
        </div>
        <div className={styles.groupPreviewImgContainer}>
          <div className={styles.groupPreviewImgFlexedWrapper}>
            <img
              className={styles.groupPreviewImg}
              src="/default_pfp.svg"
              alt=""
            />
          </div>
        </div>
        <hr />
        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="">Group name:</label>
            <input type="text" name="" id="" />
          </div>
          <div className={styles.formGroupContent}>
            <label htmlFor="">Select members:</label>
            <input type="text" name="" id="" />
          </div>
        </div>
        <div className={styles.createGroupButton}>
          <button>Create Group</button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
