import {
  FirstNameContext,
  //   LastNameContext,
  //   UserNameContext,
  //   PasswordContext,
  //   ConfirmPasswordContext,
  //   BioContext,
  //   ProfilePictureContext,
  //   BackgroundPictureContext,
  //   UserSignUpObjectContext,
} from "../contexts/UserRegistrationContext";

import styles from "./SignUpFormComponent.module.css";

import { Link } from "react-router-dom";

import { useContext } from "react";

function SignUpFormComponent() {
  const { firstName, setFirstName } = useContext(FirstNameContext);

  console.log(firstName);

  //   const { lastName, setLastName } = useContext(LastNameContext);

  //   const { username, setUsername } = useContext(UserNameContext);

  //   const { password, setPassword } = useContext(PasswordContext);

  //   const { confirmPassword, setConfirmPassword } = useContext(
  //     ConfirmPasswordContext,
  //   );

  //   const { bio, setBio } = useContext(BioContext);

  //   const { profilePicture, setProfilePicture } = useContext(
  //     ProfilePictureContext,
  //   );

  //   const { backgroundPicture, setBackgroundPicture } = useContext(
  //     BackgroundPictureContext,
  //   );

  //   const { userSignUpObj, setUserSignUpObj } = useContext(
  //     UserSignUpObjectContext,
  //   );

  async function handleSubmit(e) {
    e.preventDefault();

    const FormDataUserObject = new FormData(e.target);

    console.log(FormDataUserObject);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name"></label>
        <input type="text" name="first_name" id="" />
        <label htmlFor="last_name"></label>
        <input type="text" name="last_name" id="" />
        <label htmlFor="username"></label>
        <input type="text" name="username" id="" />
        <label htmlFor="password"></label>
        <input type="password" name="password" id="" />
        <label htmlFor="confirm_password"></label>
        <input type="password" name="confirm_password" id="" />
      </form>
    </>
  );
}

export default SignUpFormComponent;
