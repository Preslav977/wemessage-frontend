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

import {
  UserLogInObjectContext,
  UserLoggedInContext,
} from "./contexts/UserLoggedInContext";
import { Outlet } from "react-router-dom";

function App() {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [bio, setBio] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);

  const [backgroundPicture, setBackgroundPicture] = useState(null);

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

  const [userLogInObj, setUserLoginInObj] = useState({});

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <>
      <UserLogInObjectContext.Provider
        value={[userLogInObj, setUserLoginInObj]}
      >
        <UserLoggedInContext.Provider
          value={[isUserLoggedIn, setIsUserLoggedIn]}
        >
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
                      <UserNameContext.Provider
                        value={{ username, setUsername }}
                      >
                        <LastNameContext.Provider
                          value={{ lastName, setLastName }}
                        >
                          <FirstNameContext.Provider
                            value={{ firstName, setFirstName }}
                          >
                            <Outlet />
                          </FirstNameContext.Provider>
                        </LastNameContext.Provider>
                      </UserNameContext.Provider>
                    </PasswordContext.Provider>
                  </ConfirmPasswordContext.Provider>
                </BioContext.Provider>
              </ProfilePictureContext.Provider>
            </BackgroundPictureContext.Provider>
          </UserSignUpObjectContext.Provider>
        </UserLoggedInContext.Provider>
      </UserLogInObjectContext.Provider>
    </>
  );
}

export default App;
