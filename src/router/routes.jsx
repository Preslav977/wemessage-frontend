import App from "../App";

import SignUpForm from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";
import MainGridInterface from "../components/MainGridInterface";
import ManageUserProfile from "../components/ManageUserProfile";
import UserProfile from "../components/UserProfile";
import EditUserProfile from "../components/EditUserProfile";
import ChangeUserProfilePasswords from "../components/ChangeUserProfilePasswords";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorPage from "../components/ErrorPage";
import ProtectApp from "../components/ProtectApp";
import ChatsParentComponent from "../components/ChatsParentComponent";
import RenderChatOrGroupHeader from "../components/RenderChatOrGroupHeader";
import MessageChatOrGroupParent from "../components/MessageChatOrGroupParent";

const routes = [
  {
    path: "/",
    element: (
      <ProtectApp>
        <App />
      </ProtectApp>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <LogInForm /> },
      { path: "/signup", element: <SignUpForm /> },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<ManageUserProfile />}
              rightGridComponent={<UserProfile />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/edit/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<ManageUserProfile />}
              rightGridComponent={<EditUserProfile />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/change_passwords/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<ManageUserProfile />}
              rightGridComponent={<ChangeUserProfilePasswords />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/chats",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<ChatsParentComponent />}
              rightGridComponent={
                <RenderChatOrGroupHeader showChatOrGroupHeader={"Chats"} />
              }
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/chat/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<ChatsParentComponent />}
              rightGridComponent={<MessageChatOrGroupParent />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
