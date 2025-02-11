import styles from "./UserProfile.module.css";

import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { BackgroundPictureContext } from "../contexts/UserRegistrationContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PopUpModal from "./PopUpModal";

function UserProfile() {
  let [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);
  const { backgroundPicture, setBackgroundPicture } = useContext(
    BackgroundPictureContext,
  );

  const [showModalOnSuccess, setShowModalOnSuccess] = useState(false);

  async function changeBackgroundImage(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObj = formData.get("file");

    const updateBackgroundPictureObj = {
      ...backgroundPicture,
      formDataObj,
    };

    setBackgroundPicture(updateBackgroundPictureObj);

    try {
      const response = await fetch(
        `http://localhost:5000/users/profile/background_image/${userLogInObj.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        },
      );

      if (response.status === 200) {
        setShowModalOnSuccess(true);

        setTimeout(() => {
          setShowModalOnSuccess(false);
        }, 3000);
      }

      const fetchLoggedInUserInformation = await fetch(
        "http://localhost:5000/users",
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      userLogInObj = await fetchLoggedInUserInformation.json();

      const userLoggedInInformation = {
        ...userLogInObj,
        userLogInObj,
      };

      setUserLogInObj(userLoggedInInformation);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.userBgContainer}>
        {userLogInObj.background_picture === "" ? (
          <img
            className={styles.userBgImg}
            src="default_users_bg_picture.jpg"
            alt="default user background picture"
          />
        ) : (
          <img
            className={styles.userBgImg}
            src={userLogInObj.background_picture}
            alt="user background picture"
          />
        )}
        <div className={styles.userProfileContainer}>
          {userLogInObj.profile_picture === "" ? (
            <img
              className={styles.userProfileImg}
              src="/default_pfp.svg"
              alt="user profile image"
            />
          ) : (
            <img
              className={styles.updatedUserProfileImg}
              src={userLogInObj.profile_picture}
              alt="user profile image"
            />
          )}
        </div>
        <div className={styles.changeBgImgContainer}>
          <form
            className={styles.changeBgImgForm}
            encType="multipart/form-data"
            onSubmit={changeBackgroundImage}
          >
            <label htmlFor="file"></label>
            <input
              className={styles.changeBgImgInput}
              type="file"
              name="file"
              id="file"
            />
            <button className={styles.changeBgImgBtn} type="submit">
              Save
            </button>
          </form>
          <img
            className={styles.changeBgImg}
            src="/update_pfp.svg"
            alt="update background image"
          />
        </div>
        {userLogInObj.online_presence === "ONLINE" ? (
          <div
            className={styles.userPresenceStatus}
            style={{ backgroundColor: "lightgreen" }}
          ></div>
        ) : (
          <div
            className={styles.userPresenceStatus}
            style={{ backgroundColor: "lightgray" }}
          ></div>
        )}
      </div>
      <div className={styles.userCredentials}>
        <div>
          <p>
            {userLogInObj.first_name} {userLogInObj.last_name}
          </p>
          <p>@{userLogInObj.username}</p>
          <p className={styles.usersBioParagraph}>{userLogInObj.bio}</p>
        </div>
        <li>
          <Link
            className={styles.editProfileAnchor}
            to={`/profile/edit/${userLogInObj.id}`}
          >
            Edit Profile
          </Link>
        </li>
      </div>
      {showModalOnSuccess && (
        <PopUpModal
          popUpModalBackgroundColor={"white"}
          popUpModalContentColor={"black"}
          popUpModalBorderColor={"white"}
          popUpModalContentHeader={"Cover photo has been updated"}
          popUpModalContentText={
            "Your cover photo has been updated successfully"
          }
        />
      )}
    </>
  );
}

export default UserProfile;
