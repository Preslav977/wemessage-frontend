import App from "../App";

import SignUpForm from "../components/SignUpForm/SignUpForm";
import LogInForm from "../components/LogInForm/LogInForm";
import MainGridInterface from "../components/MainGridInterface/MainGridInterface";
import ManageUserProfile from "../components/ManageUserProfile/ManageUserProfile";
import UserProfile from "../components/UserProfile/UserProfile";
import EditUserProfile from "../components/EditUserProfile/EditUserProfile";
import UpdateUserPasswords from "../components/UpdateUserPasswords/UpdateUserPasswords";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import ToggleBetweenChatsOrSearchForUser from "../components/ToggleBetweenChatsOrSearchForUser/ToggleBetweenChatsOrSearchForUser";
import RenderChatDetailsMessages from "../components/RenderChatDetailsMessages/RenderChatDetailsMessages";
import RenderAllGroups from "../components/RenderAllGroups";
import RenderGroupDetailsMessages from "../components/RenderGroupDetailsMessages";
import RenderGroupDetailsMessagesParent from "../components/RenderGroupDetailsMessagesParent";
import CreateGroup from "../components/CreateGroup";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
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
              rightGridComponent={<UpdateUserPasswords />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/chats",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<ToggleBetweenChatsOrSearchForUser />}
              rightGridComponent={
                <RenderChatDetailsMessages renderChatsOrChatDetails={false} />
              }
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/chats/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<ToggleBetweenChatsOrSearchForUser />}
              rightGridComponent={
                <RenderChatDetailsMessages renderChatsOrChatDetails={true} />
              }
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/groups",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<RenderAllGroups />}
              rightGridComponent={
                <RenderGroupDetailsMessagesParent>
                  <RenderGroupDetailsMessages />
                </RenderGroupDetailsMessagesParent>
              }
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/groups/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<RenderAllGroups />}
              rightGridComponent={
                <RenderGroupDetailsMessagesParent>
                  <RenderGroupDetailsMessages />
                </RenderGroupDetailsMessagesParent>
              }
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/groups/create",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              leftGridComponent={<RenderAllGroups />}
              rightGridComponent={<CreateGroup />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
