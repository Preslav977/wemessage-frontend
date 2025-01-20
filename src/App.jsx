import { useState } from "react";

import {
  FirstNameContext,
  LastNameContext,
  UserNameContext,
  PasswordContext,
  ConfirmPasswordContext,
  BioContext,
  ProfilePictureContext,
  BackgroundPictureContext,
} from "./contexts/UserRegistrationContext";

// import './App.css'

function App() {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [bio, setBio] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  const [backgroundPicture, setBackgroundPicture] = useState("");

  return (
    <>
      <FirstNameContext.Provider
        value={{ firstName, setFirstName }}
      ></FirstNameContext.Provider>

      <LastNameContext.Provider
        value={{ lastName, setLastName }}
      ></LastNameContext.Provider>

      <UserNameContext.Provider
        value={{ username, setUsername }}
      ></UserNameContext.Provider>

      <PasswordContext.Provider
        value={{ password, setPassword }}
      ></PasswordContext.Provider>

      <ConfirmPasswordContext.Provider
        value={{ confirmPassword, setConfirmPassword }}
      ></ConfirmPasswordContext.Provider>

      <BioContext.Provider value={{ bio, setBio }}></BioContext.Provider>

      <ProfilePictureContext.Provider
        value={{ profilePicture, setProfilePicture }}
      ></ProfilePictureContext.Provider>

      <BackgroundPictureContext.Provider
        value={{ backgroundPicture, setBackgroundPicture }}
      ></BackgroundPictureContext.Provider>
    </>
  );
}

export default App;
