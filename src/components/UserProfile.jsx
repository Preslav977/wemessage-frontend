import styles from "./UserProfile.module.css";

import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { BackgroundPictureContext } from "../contexts/UserRegistrationContext";
import { PopUpModalContext } from "../contexts/PopUpModalContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PopUpModal from "./PopUpModal";

function UserProfile() {
  let [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);
  const { backgroundPicture, setBackgroundPicture } = useContext(
    BackgroundPictureContext,
  );

  const [popUpModal, setPopUpModal] = useContext(PopUpModalContext);

  const [state, setState] = useState(false);

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

      console.log(response);

      if (response === 403) {
        setState(false);
      }

      const result = await response.json();

      const fetchLoggedInUserInformation = await fetch(
        "http://localhost:5000/users",
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      console.log(fetchLoggedInUserInformation.status);

      // if (fetchLoggedInUserInformation.status === 200 && popUpModal) {
      //   setPopUpModal(false);
      // }

      userLogInObj = await fetchLoggedInUserInformation.json();

      const userLoggedInInformation = {
        ...userLogInObj,
        userLogInObj,
      };

      setUserLogInObj(userLoggedInInformation);

      // setPopUpModal(false);
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
            src="/user-default-bg-image.jpg"
            alt="user background image"
          />
        ) : (
          <img
            className={styles.userBgImg}
            src={userLogInObj.background_picture}
            alt="user background image"
          />
        )}
        <div className={styles.userProfileContainer}>
          {userLogInObj.profile_picture === "" ? (
            <img
              className={styles.userProfileImg}
              src="/default-profile-image.svg"
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
            src="/edit-profile-image.svg"
            alt="change user background image"
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
        </div>
        <li>
          <Link className={styles.editProfileAnchor} to="/profile/edit/4">
            Edit Profile
          </Link>
        </li>
      </div>
      {/* {!state && (
        <PopUpModal
          popUpModalBackgroundColor={"white"}
          popUpModalContentColor={"black"}
          popUpModalBorderColor={"white"}
          popUpModalContentHeader={"Cover photo has been updated"}
          popUpModalContentText={
            "Your cover photo has been updated successfully"
          }
        />
      )} */}
    </>
  );
}

export default UserProfile;
