import { useState } from "react";

import {
  UserSignUpObjectContext,
  FirstNameContext,
  LastNameContext,
  UserNameContext,
  PasswordContext,
  ConfirmPasswordContext,
  BioContext,
  ProfilePictureContext,
  BackgroundPictureContext,
} from "./contexts/UserRegistrationContext";

import SignUpFormComponent from "./components/SignUpFormComponent";

function App() {
  const [firstName, setFirstName] = useState("");

  // const [lastName, setLastName] = useState("");

  // const [username, setUsername] = useState("");

  // const [password, setPassword] = useState("");

  // const [confirmPassword, setConfirmPassword] = useState("");

  // const [bio, setBio] = useState("");

  // const [profilePicture, setProfilePicture] = useState("");

  // const [backgroundPicture, setBackgroundPicture] = useState("");

  // const [userSignUpObj, setUserSignUpObj] = useState({
  //   first_name: "",
  //   last_name: "",
  //   username: "",
  //   password: "",
  //   confirm_password: "",
  //   bio: "",
  //   profile_picture: "",
  //   background_picture: "",
  // });

  return (
    <>
      <FirstNameContext.Provider value={{ firstName, setFirstName }}>
        <SignUpFormComponent />
      </FirstNameContext.Provider>
    </>
  );
}

export default App;
