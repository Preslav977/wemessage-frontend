import styles from "./UserProfile.module.css";

import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { BackgroundPictureContext } from "../../contexts/UserRegistrationContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PopUpModal from "../PopUpModal/PopUpModal";
import { useRef } from "react";
import { PopUpModalContext } from "../../contexts/PopUpModalContext";
import { useParams } from "react-router-dom";
import useFetchSingleUserURL from "../api/custom hooks/useFetchSingleUserURL";

function UserProfile() {
  let [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const { backgroundPicture, setBackgroundPicture } = useContext(
    BackgroundPictureContext,
  );

  const [showModalOnSuccess, setShowModalOnSuccess] = useState(false);

  const [popUpModal, setPopUpModal] = useContext(PopUpModalContext);

  const saveBtnRef = useRef(null);

  const { id } = useParams();

  const { userGetById } = useFetchSingleUserURL();

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
          setPopUpModal(false);
        }, 3000);
      }

      const result = await response.json();

      console.log(result);

      const userLoggedInInformation = {
        ...userLogInObj,
        background_picture: result.background_picture,
      };

      setUserLogInObj(userLoggedInInformation);

      if (saveBtnRef.current.style.display === "block") {
        saveBtnRef.current.style.display = "none";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function startConversation(e) {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          receiverId: Number(userGetById.id),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  function showSaveBtn() {
    if (saveBtnRef.current.style.display === "none") {
      saveBtnRef.current.style.display = "block";
    }
  }

  if (userLogInObj.id !== Number(id)) {
    return (
      <>
        <div className={styles.userBgContainer}>
          {userGetById.background_picture === "" ? (
            <img
              className={styles.userBgImg}
              src="/default_users_bg_picture.jpg"
              alt="default user background picture"
            />
          ) : (
            <img
              className={styles.userBgImg}
              src={userGetById.background_picture}
              alt="user background picture"
            />
          )}
          <div className={styles.userProfileContainer}>
            {userGetById.profile_picture === "" ? (
              <img
                className={styles.userProfileImg}
                src="/default_pfp.svg"
                alt="user profile image"
              />
            ) : (
              <img
                className={styles.updatedUserProfileImg}
                src={userGetById.profile_picture}
                alt="user profile image"
              />
            )}
          </div>
          {userLogInObj.online_presence === "ONLINE" ? (
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
        <div className={styles.userCredentials}>
          <div>
            <p>
              {userGetById.first_name} {userGetById.last_name}
            </p>
            <p>@{userGetById.username}</p>
            <p className={styles.usersBioParagraph}>{userGetById.bio}</p>
          </div>
          <form onSubmit={startConversation}>
            <button type="Submit">Send Message</button>
          </form>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.userBgContainer}>
        {userLogInObj.background_picture === "" ? (
          <img
            className={styles.userBgImg}
            src="/default_users_bg_picture.jpg"
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
              onClick={showSaveBtn}
              className={styles.changeBgImgInput}
              type="file"
              name="file"
              id="file"
              data-testid="background_image"
            />
            <button
              style={{
                display: "none",
              }}
              className={styles.changeBgImgBtn}
              type="submit"
              ref={saveBtnRef}
            >
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
      {popUpModal && (
        <PopUpModal
          popUpModalBackgroundColor={"white"}
          popUpModalContentColor={"black"}
          popUpModalBorderColor={"white"}
          popUpModalContentHeader={"Profile updated"}
          popUpModalContentText={"Your profile has been updated successfully"}
        />
      )}
      {showModalOnSuccess && (
        <PopUpModal
          popUpModalBackgroundColor={"white"}
          popUpModalContentColor={"black"}
          popUpModalBorderColor={"white"}
          popUpModalContentHeader={"Cover photo"}
          popUpModalContentText={
            "Your cover photo has been updated successfully"
          }
        />
      )}
    </>
  );
}

export default UserProfile;
