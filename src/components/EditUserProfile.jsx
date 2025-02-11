import styles from "./EditUserProfile.module.css";
import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { ProfilePictureContext } from "../contexts/UserRegistrationContext";
import {
  FirstNameContext,
  LastNameContext,
  UserNameContext,
  BioContext,
} from "../contexts/UserRegistrationContext";
import { useContext, useState } from "react";

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

  const [bioError, setBioError] = useState("");

  async function changeProfileImage(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObj = formData.get("file");

    // console.log(formDataObj);

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

  async function updateUserProfile(e) {
    e.preventDefault();

    const FormDataUserObject = new FormData(e.target);
    const firstName = FormDataUserObject.get("first_name");
    const lastName = FormDataUserObject.get("last_name");
    const userName = FormDataUserObject.get("username");
    const bio = FormDataUserObject.get("bio");

    const updateLoggedInObject = {
      ...userLogInObj,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
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
      } else {
        const result = await response.json();

        result.map((err) => {
          if (err.msg === "First name is already taken") {
            setFirstNameError(err.msg);
          } else if (err.msg === "Last name is already taken") {
            setLastNameError(err.msg);
          } else if (err.msg === "Username is already taken") {
            setUsernameError(err.msg);
          } else {
            setBioError(err.smg === "Bio must not be more than 150 characters");
          }
        });
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
    <div className={styles.sectionWrapper}>
      <div className={styles.changeProfilePictureContainer}>
        <h3>Profile Picture</h3>
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
              className={styles.editInputProfileImage}
              type="file"
              name="file"
              id="file"
            />
          </label>
          <div className={styles.submitProfilePictureContainer}>
            <button className={styles.submitProfilePicture} type="submit">
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
              src="/default_users_pfp.svg"
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
      <hr />
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
              maxLength={150}
              rows={12}
              name="bio"
              id="bio"
              required
            ></textarea>
            {bio.length < 150 && (
              <span className={styles.error}>
                Bio must not be more than 150 characters
              </span>
            )}
            {bioError && <span className={styles.error}>{bioError}</span>}
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
