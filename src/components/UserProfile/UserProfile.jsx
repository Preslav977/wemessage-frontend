import styles from "./UserProfile.module.css";

import { useContext, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";
import { BackgroundPictureContext } from "../../contexts/UserRegistrationContext";

import { ShowPopUpModalOnProfileUpdateContext } from "../../contexts/PopUpModalContext";

import useFetchSingleUserURL from "../api/custom hooks/useFetchSingleUserURL";

import PopUpModal from "../PopUpModal/PopUpModal";

import localhostURL from "../../utility/localhostURL";

function UserProfile() {
  let [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  // console.log(userLogInObj);

  const { backgroundPicture, setBackgroundPicture } = useContext(
    BackgroundPictureContext,
  );

  const [showPopModalBackgroundPicture, setShowPopModalBackgroundPicture] =
    useState(false);

  const [showPopUpModalProfileUpdate, setShowPopUpModalProfileUpdate] =
    useContext(ShowPopUpModalOnProfileUpdateContext);

  const [showPopUpModalOnExpiredToken, setShowPopUpModalOnExpiredToken] =
    useState(false);

  const { userGetById } = useFetchSingleUserURL();

  const hideSaveBtnRef = useRef(null);

  const { id } = useParams();

  const navigate = useNavigate();

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
        `${localhostURL}/users/profile/background_image/${userLogInObj.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        },
      );

      if (response.status === 200) {
        setShowPopModalBackgroundPicture(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopModalBackgroundPicture(false);
          setShowPopUpModalProfileUpdate(false);
        }, 3000);
      }

      if (response.status === 403) {
        setShowPopUpModalOnExpiredToken(true);

        //reset the state in order to popup the modal again
        setTimeout(() => {
          setShowPopUpModalOnExpiredToken(false);
        }, 3000);
      }

      // console.log(response);

      const result = await response.json();

      const userLoggedInInformation = {
        ...userLogInObj,
        background_picture: result.background_picture,
      };

      setUserLogInObj(userLoggedInInformation);

      if (hideSaveBtnRef.current.style.display === "block") {
        hideSaveBtnRef.current.style.display = "none";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function startConversation(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${localhostURL}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          senderId: userLogInObj.id,
          receiverId: Number(userGetById.id),
        }),
      });

      const result = await response.json();

      console.log(result);

      navigate(`/chats/${result.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  function showSaveBtn() {
    if (hideSaveBtnRef.current.style.display === "none") {
      hideSaveBtnRef.current.style.display = "block";
    }
  }

  //if the logged user doesn't represent the ID render the other user profile
  if (userLogInObj.id !== Number(id)) {
    return (
      <>
        <div className={styles.userBgContainer}>
          {userGetById.background_picture === "" ? (
            <>
              <img
                className={styles.userBgImg}
                src="/default_users_bg_picture.png"
                alt="user default background picture"
              />
              <div className={styles.flexedBackgroundPhotoCredits}>
                <p className={styles.backgroundPhotoCredits}>
                  Photo by{" "}
                  <Link to={"https://unsplash.com/@ksushlapush"}>
                    Kseniya Lapteva
                  </Link>
                </p>
              </div>
            </>
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
            <p className={styles.userFirstAndLastName}>
              {userGetById.first_name} {userGetById.last_name}
            </p>
            <p className={styles.userUsername}> @{userGetById.username}</p>
            <p className={styles.usersBioParagraph}>{userGetById.bio}</p>
          </div>
          <form onSubmit={startConversation}>
            <button
              disabled={userLogInObj.role === "GUEST" ? true : false}
              className={styles.sendMessageBtn}
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.userBgContainer}>
        {userLogInObj.background_picture === "" ? (
          <>
            <img
              className={styles.userBgImg}
              src="/default_users_bg_picture.png"
              alt="user default background picture"
            />
            <div className={styles.flexedBackgroundPhotoCredits}>
              <p className={styles.backgroundPhotoCredits}>
                Photo by{" "}
                <Link to={"https://unsplash.com/@ksushlapush"}>
                  Kseniya Lapteva
                </Link>
              </p>
            </div>
          </>
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
              disabled={userLogInObj.role === "GUEST" ? true : false}
            />
            <button
              style={{
                display: "none",
              }}
              className={styles.changeBgImgBtn}
              type="submit"
              ref={hideSaveBtnRef}
            >
              Save
            </button>
          </form>
          <img
            className={styles.changeBgImg}
            src="/update_pfp.svg"
            alt="updated background image"
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
          <p className={styles.userFirstAndLastName}>
            {userLogInObj.first_name} {userLogInObj.last_name}
          </p>
          <p className={styles.userUsername}>@{userLogInObj.username}</p>
        </div>
        <ul className={styles.ulProfileAndPasswordsAnchorContainer}>
          <li>
            <Link
              className={styles.editProfileAnchor}
              to={`/profile/edit/${userLogInObj.id}`}
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <Link
              className={styles.updatePasswordsAnchor}
              to={`/profile/change_passwords/${userLogInObj.id}`}
            >
              Change Passwords
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.usersBioParagraph}>
        <p>{userLogInObj.bio}</p>
      </div>
      {showPopUpModalProfileUpdate && (
        <PopUpModal
          popUpModalBackgroundColor={"white"}
          popUpModalContentColor={"black"}
          popUpModalBorderColor={"white"}
          popUpModalContentHeader={"Profile Updated"}
          popUpModalContentText={"Your profile has been updated successfully"}
        />
      )}
      {showPopModalBackgroundPicture && (
        <PopUpModal
          popUpModalBackgroundColor={"white"}
          popUpModalContentColor={"black"}
          popUpModalBorderColor={"white"}
          popUpModalContentHeader={"Cover Photo Updated"}
          popUpModalContentText={
            "Your cover photo has been updated successfully"
          }
        />
      )}
      {showPopUpModalOnExpiredToken && (
        <PopUpModal
          popUpModalBackgroundColor={"red"}
          popUpModalContentColor={"white"}
          popUpModalBorderColor={"red"}
          popUpModalContentHeader={"Token expired"}
          popUpModalContentText={"Token has expired login again to continue!"}
        />
      )}
    </>
  );
}
export default UserProfile;
