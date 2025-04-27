import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ProtectedAppRoute from "../components/ProtectAppRoute/ProtectAppRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import LogInForm from "../components/LogInForm/LogInForm";
import MainGridInterface from "../components/MainGridInterface/MainGridInterface";
import ManageUserProfile from "../components/ManageUserProfile/ManageUserProfile";
import UserProfile from "../components/UserProfile/UserProfile";
import EditUserProfile from "../components/EditUserProfile/EditUserProfile";
import UpdateUserPasswords from "../components/UpdateUserPasswords/UpdateUserPasswords";
import ToggleBetweenChatsOrSearchForUser from "../components/ToggleBetweenChatsOrSearchForUser/ToggleBetweenChatsOrSearchForUser";
import RenderChatDetailsMessages from "../components/RenderChatDetailsMessages/RenderChatDetailsMessages";
import RenderAllGroups from "../components/RenderAllGroups/RenderAllGroups";
import RenderGroupDetailsMessages from "../components/RenderGroupDetailsMessages/RenderGroupDetailsMessages";
import CreateGroup from "../components/CreateGroup/CreateGroup";
import RenderGlobalChatDetailsMessages from "../components/RenderGlobalChatDetailsMessages/RenderGlobalChatDetailsMessages";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedAppRoute>
      <App />
      // </ProtectedAppRoute>
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
              currentPath={"/profile/"}
              leftGridComponent={
                <ManageUserProfile currentPath={"/profile/"} />
              }
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
              currentPath={"/profile/edit/"}
              leftGridComponent={
                <ManageUserProfile currentPath={"/profile/edit/"} />
              }
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
              currentPath={"/profile/change_passwords/"}
              leftGridComponent={
                <ManageUserProfile currentPath={"/profile/change_passwords/"} />
              }
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
              currentPath={"/chats"}
              leftGridComponent={
                <ToggleBetweenChatsOrSearchForUser
                  renderChatsOrGlobalChat={false}
                />
              }
              rightGridComponent={<RenderChatDetailsMessages />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/chats/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              currentPath={"/chats/"}
              leftGridComponent={
                <ToggleBetweenChatsOrSearchForUser
                  renderChatsOrGlobalChat={false}
                />
              }
              rightGridComponent={<RenderChatDetailsMessages />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/groups",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              currentPath={"/groups"}
              leftGridComponent={<RenderAllGroups />}
              rightGridComponent={<RenderGroupDetailsMessages />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/groups/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              currentPath={"/groups/"}
              leftGridComponent={<RenderAllGroups />}
              rightGridComponent={<RenderGroupDetailsMessages />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/groups/create",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              currentPath={"/groups/"}
              leftGridComponent={<RenderAllGroups />}
              rightGridComponent={<CreateGroup />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
      {
        path: "/globalChat/:id",
        element: (
          <ProtectedRoute>
            <MainGridInterface
              currentPath={"/globalChat/"}
              leftGridComponent={
                <ToggleBetweenChatsOrSearchForUser
                  renderChatsOrGlobalChat={true}
                />
              }
              rightGridComponent={<RenderGlobalChatDetailsMessages />}
            ></MainGridInterface>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
