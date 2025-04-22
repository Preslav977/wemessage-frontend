import styles from "./EditUserProfile.module.css";

import { useContext, useState, useRef } from "react";

import { useNavigate, Link } from "react-router-dom";

import { UserLogInObjectContext } from "../../contexts/UserLoggedInContext";

import {
  FirstNameContext,
  LastNameContext,
  UserNameContext,
  BioContext,
  ProfilePictureContext,
} from "../../contexts/UserRegistrationContext";

function EditUserProfile() {
  let [userLogInObj, setUserLogInObj] = useContext(UserLogInObjectContext);

  const { profilePicture, setProfilePicture } = useContext(
    ProfilePictureContext,
  );

  const { firstName, setFirstName } = useContext(FirstNameContext);

  const { lastName, setLastName } = useContext(LastNameContext);

  const { username, setUsername } = useContext(UserNameContext);

  const { bio, setBio } = useContext(BioContext);

  const [firstNameError, setFirstNameError] = useState("");

  const [lastNameError, setLastNameError] = useState("");

  const [usernameError, setUsernameError] = useState("");

  const hideSendBtnRef = useRef(null);

  const navigate = useNavigate();

  async function changeProfileImage(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObj = formData.get("file");

    const updateProfilePictureObj = {
      ...profilePicture,
      formDataObj,
    };

    setProfilePicture(updateProfilePictureObj);

    try {
      const response = await fetch(
        `http://localhost:5000/users/profile/image/${userLogInObj.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        },
      );

      const result = await response.json();

      const userLoggedInInformation = {
        ...userLogInObj,
        profile_picture: result.profile_picture,
      };

      setUserLogInObj(userLoggedInInformation);

      if (hideSendBtnRef.current.style.display === "block") {
        hideSendBtnRef.current.style.display = "none";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateUserProfile(e) {
    e.preventDefault();

    const FormDataUserObject = new FormData(e.target);
    const firstName = FormDataUserObject.get("first_name");
    const lastName = FormDataUserObject.get("last_name");
    const userName = FormDataUserObject.get("username");
    const bio = FormDataUserObject.get("bio");

    const updateLoggedInObject = {
      ...userLogInObj,
      first_name: firstName,
      last_name: lastName,
      username: userName,
      bio: bio,
    };

    setUserLogInObj(updateLoggedInObject);

    try {
      const response = await fetch(
        `http://localhost:5000/users/profile/edit/${userLogInObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username: userName,
            bio: bio,
          }),
        },
      );

      if (response.status === 200) {
        setFirstName("");
        setLastName("");
        setUsername("");
        setBio("");

        const result = await response.json();

        const userLoggedInInformation = {
          ...userLogInObj,
          first_name: result.first_name,
          last_name: result.last_name,
          username: result.username,
          bio: result.bio,
        };

        setUserLogInObj(userLoggedInInformation);

        navigate(`/profile/${userLogInObj.id}`);
      } else {
        const result = await response.json();
        result.map((err) => {
          if (err.msg === "First name is already taken") {
            setFirstNameError(err.msg);
          } else if (err.msg === "Last name is already taken") {
            setLastNameError(err.msg);
          } else if (err.msg === "Username is already taken") {
            setUsernameError(err.msg);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function showSendBtn() {
    if (hideSendBtnRef.current.style.display === "none") {
      hideSendBtnRef.current.style.display = "block";
    }
  }

  return (
    <div className={styles.sectionWrapper}>
      <Link
        className={styles.userProfileAnchor}
        to={`/profile/${userLogInObj.id}`}
      >
        <img
          className={styles.useProfileAnchorImg}
          src="/back-arrow.svg"
          alt="go back to user profile"
        />
      </Link>
      <hr className={styles.userProfileTopHr} />

      <div className={styles.changeProfilePictureContainer}>
        <h3 className={styles.changeProfilePictureHeader}>Profile Picture</h3>
        <form
          className={styles.formChangeProfilePicture}
          onSubmit={changeProfileImage}
        >
          <label className={styles.editUserProfileLabel}>
            Edit
            <img
              className={styles.editUserProfileImage}
              src="/edit_profile.svg"
              alt="update user profile picture"
            />
            <input
              onClick={showSendBtn}
              className={styles.editInputProfileImage}
              type="file"
              name="file"
              id="file"
              data-testid="profile_image"
            />
          </label>
          <div className={styles.submitProfilePictureContainer}>
            <button
              style={{
                display: "none",
              }}
              ref={hideSendBtnRef}
              className={styles.submitProfilePicture}
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className={styles.userProfileContainer}>
        <div className={styles.flexedUserProfileContent}>
          {userLogInObj.profile_picture === "" ? (
            <img
              className={styles.userProfileImage}
              src="/default_pfp.svg"
              alt="user profile picture"
            />
          ) : (
            <img
              className={styles.updatedUserProfileImage}
              src={userLogInObj.profile_picture}
              alt="user profile picture"
            />
          )}
        </div>
      </div>
      <hr className={styles.userProfileBottomHr} />
      <form onSubmit={updateUserProfile}>
        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <div className={styles.formInputGroup}>
              <label htmlFor="first_name">
                First name: <span className={styles.error}>*</span>
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                minLength={1}
                maxLength={30}
                type="text"
                name="first_name"
                id="first_name"
                data-testid="first_name"
                required
              />
              {firstName.length < 1 && (
                <span className={styles.error}>
                  First name must be between 1 and 30 characters
                </span>
              )}
              {firstNameError && (
                <span className={styles.error}>{firstNameError}</span>
              )}
            </div>
            <div className={styles.formInputGroup}>
              <label htmlFor="last_name">
                Last name: <span className={styles.error}>*</span>
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                minLength={1}
                maxLength={30}
                type="text"
                name="last_name"
                id="last_name"
                data-testid="last_name"
                required
              />
              {lastName.length < 1 && (
                <span className={styles.error}>
                  Last name must be between 1 and 30 characters
                </span>
              )}
              {lastNameError && (
                <span className={styles.error}>{lastNameError}</span>
              )}
            </div>
            <div className={styles.formInputGroup}>
              <label htmlFor="username">
                Username: <span className={styles.error}>*</span>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={1}
                maxLength={30}
                type="text"
                name="username"
                id="username"
                data-testid="username"
                required
              />
              {username.length < 1 && (
                <span className={styles.error}>
                  Username must be between 1 and 30 characters
                </span>
              )}
              {usernameError && (
                <span className={styles.error}>{usernameError}</span>
              )}
            </div>
          </div>
          <div className={styles.formTextareaGroup}>
            <label htmlFor="bio">
              Bio: <span className={styles.error}>*</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              minLength={1}
              maxLength={150}
              // rows={13}
              name="bio"
              id="bio"
              data-testid="bio"
              required
            ></textarea>
            {bio.length < 1 && (
              <span className={styles.error}>
                Bio must be between 1 and 150 characters
              </span>
            )}
          </div>
        </div>
        <div className={styles.submitBtnContainer}>
          <button className={styles.submitBtn}>save changes</button>
        </div>
      </form>
    </div>
  );
}

export default EditUserProfile;
