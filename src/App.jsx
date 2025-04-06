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
  UserLoggedInGetByIdContext,
} from "./contexts/UserLoggedInContext";

import { UsersContext } from "./contexts/UsersContext";

import { ChatsContext, ChatDetailsContext } from "./contexts/ChatsContext";

import {
  GroupsContext,
  GroupDetailsContext,
  GroupMembersContext,
} from "./contexts/GroupsContext";

import { GlobalChatDetailsContext } from "./contexts/GlobalChatContext";

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

  const [chats, setChats] = useState([]);

  const [chatDetails, setChatDetails] = useState([]);

  const [users, setUsers] = useState();

  const [userGetById, setUserGetById] = useState([]);

  const [groups, setGroups] = useState([]);

  const [groupDetails, setGroupDetails] = useState([]);

  const [groupMembers, setGroupMembers] = useState([]);

  const [globalChatDetails, setGlobalChatDetails] = useState([]);

  return (
    <>
      <UserLoggedInGetByIdContext.Provider
        value={[userGetById, setUserGetById]}
      >
        <UsersContext.Provider value={[users, setUsers]}>
          <GlobalChatDetailsContext.Provider
            value={[globalChatDetails, setGlobalChatDetails]}
          >
            <GroupMembersContext.Provider
              value={[groupMembers, setGroupMembers]}
            >
              <GroupDetailsContext.Provider
                value={[groupDetails, setGroupDetails]}
              >
                <GroupsContext.Provider value={[groups, setGroups]}>
                  <ChatDetailsContext.Provider
                    value={[chatDetails, setChatDetails]}
                  >
                    <ChatsContext.Provider value={[chats, setChats]}>
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
                              value={{
                                backgroundPicture,
                                setBackgroundPicture,
                              }}
                            >
                              <ProfilePictureContext.Provider
                                value={{ profilePicture, setProfilePicture }}
                              >
                                <BioContext.Provider value={{ bio, setBio }}>
                                  <ConfirmPasswordContext.Provider
                                    value={{
                                      confirmPassword,
                                      setConfirmPassword,
                                    }}
                                  >
                                    <PasswordContext.Provider
                                      value={{ password, setPassword }}
                                    >
                                      <UserNameContext.Provider
                                        value={{ username, setUsername }}
                                      >
                                        <LastNameContext.Provider
                                          value={{ lastName, setLastName }}
                                        >
                                          <FirstNameContext.Provider
                                            value={{
                                              firstName,
                                              setFirstName,
                                            }}
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
                    </ChatsContext.Provider>
                  </ChatDetailsContext.Provider>
                </GroupsContext.Provider>
              </GroupDetailsContext.Provider>
            </GroupMembersContext.Provider>
          </GlobalChatDetailsContext.Provider>
        </UsersContext.Provider>
      </UserLoggedInGetByIdContext.Provider>
    </>
  );
}

export default App;
