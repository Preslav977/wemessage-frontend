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
  UserSignUpObjectContext,
} from "./contexts/UserRegistrationContext";

import SignUpFormComponent from "./components/SignUpFormComponent";

function App() {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [bio, setBio] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  const [backgroundPicture, setBackgroundPicture] = useState("");

  const [userSignUpObj, setUserSignUpObj] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
    bio: "",
    profile_picture: "",
    background_picture: "",
  });

  return (
    <>
      <UserSignUpObjectContext.Provider
        value={{ userSignUpObj, setUserSignUpObj }}
      >
        <BackgroundPictureContext.Provider
          value={{ backgroundPicture, setBackgroundPicture }}
        >
          <ProfilePictureContext.Provider
            value={{ profilePicture, setProfilePicture }}
          >
            <BioContext.Provider value={{ bio, setBio }}>
              <ConfirmPasswordContext.Provider
                value={{ confirmPassword, setConfirmPassword }}
              >
                <PasswordContext.Provider value={{ password, setPassword }}>
                  <UserNameContext.Provider value={{ username, setUsername }}>
                    <LastNameContext.Provider value={{ lastName, setLastName }}>
                      <FirstNameContext.Provider
                        value={{ firstName, setFirstName }}
                      >
                        <SignUpFormComponent />
                      </FirstNameContext.Provider>
                    </LastNameContext.Provider>
                  </UserNameContext.Provider>
                </PasswordContext.Provider>
              </ConfirmPasswordContext.Provider>
            </BioContext.Provider>
          </ProfilePictureContext.Provider>
        </BackgroundPictureContext.Provider>
      </UserSignUpObjectContext.Provider>
    </>
  );
}

export default App;
