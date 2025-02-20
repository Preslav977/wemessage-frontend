import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { failedEditProfileServer } from "./mocks/editProfileMocks/failedEditProfileServer";
import { failedEditProfileHandler } from "./mocks/editProfileMocks/failedEditProfileHandler";
import { successEditProfileHandler } from "./mocks/editProfileMocks/successEditProfileHandler";
import { successEditProfileServer } from "./mocks/editProfileMocks/successEditProfileServer";

describe("should render MainGridInterface", () => {
  // it("should render Login form then navigate to UserProfile", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/9"],
  //     initialIndex: 0,
  //   });
  //   render(<RouterProvider router={router} />);
  //   const user = userEvent.setup();
  //   await user.type(screen.getByTestId("username"), "test");
  //   expect(screen.getByTestId("username")).toHaveValue("test");
  //   await user.type(screen.getByTestId("password"), "12345678Bg@");
  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");
  //   const submitBtn = screen.queryAllByRole("button");
  //   // screen.debug();
  //   await user.click(submitBtn[1]);
  //   const loadingBtn = await screen.findByTestId("loading-btn");
  //   expect(loadingBtn).toBeInTheDocument();
  //   await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  //   // screen.debug();
  //   expect(screen.queryByText("Global").textContent).toMatch(/global/i);
  //   expect(screen.queryByText("Chats").textContent).toMatch(/chats/i);
  //   expect(screen.queryByText("Groups").textContent).toMatch(/groups/i);
  //   expect(screen.queryAllByText("Profile")[0].textContent).toMatch(/profile/i);
  //   expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);
  //   expect(screen.queryByText("Manage Profile").textContent).toMatch(
  //     /manage profile/i,
  //   );
  //   expect(screen.queryAllByText("Profile")[1].textContent).toMatch(/profile/i);
  //   expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
  //     /edit profile/i,
  //   );
  //   expect(screen.queryByText("Change Password").textContent).toMatch(
  //     /change password/i,
  //   );
  //   // expect(screen.queryByRole("button", { name: "Save" })).toBeInTheDocument();
  //   expect(screen.queryByText("preslaw preslaw").textContent).toMatch(
  //     /preslaw preslaw/i,
  //   );
  //   expect(screen.queryByText("@preslaw").textContent).toMatch(/@preslaw/);
  //   expect(screen.queryByTestId("user_presence")).toBeInTheDocument();
  //   expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
  //     /edit profile/i,
  //   );
  // });
  // it("should render Login form then navigate to EditUserProfile", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/4", "/profile/edit/4"],
  //     initialIndex: 0,
  //   });
  //   render(<RouterProvider router={router} />);
  //   const user = userEvent.setup();
  //   await user.type(screen.getByTestId("username"), "preslaw");
  //   expect(screen.getByTestId("username")).toHaveValue("preslaw");
  //   await user.type(screen.getByTestId("password"), "12345678Bg@");
  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");
  //   const submitBtn = screen.queryAllByRole("button");
  //   // screen.debug();
  //   await user.click(submitBtn[1]);
  //   const loadingBtn = await screen.findByTestId("loading-btn");
  //   expect(loadingBtn).toBeInTheDocument();
  //   await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  //   expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
  //     /edit profile/i,
  //   );
  //   const manageUserProfileEditProfile = screen.queryAllByText("Edit Profile");
  //   await user.click(manageUserProfileEditProfile[1]);
  //   // screen.debug();
  //   expect(screen.queryByText("Global").textContent).toMatch(/global/i);
  //   expect(screen.queryByText("Chats").textContent).toMatch(/chats/i);
  //   expect(screen.queryByText("Groups").textContent).toMatch(/groups/i);
  //   expect(screen.queryAllByText("Profile")[0].textContent).toMatch(/profile/i);
  //   expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);
  //   expect(screen.queryByText("Manage Profile").textContent).toMatch(
  //     /manage profile/i,
  //   );
  //   expect(screen.queryAllByText("Profile")[1].textContent).toMatch(/profile/i);
  //   expect(screen.queryByText("Edit Profile").textContent).toMatch(
  //     /edit profile/i,
  //   );
  //   expect(screen.queryByText("Change Password").textContent).toMatch(
  //     /change password/i,
  //   );
  //   expect(screen.queryByText("Profile Picture").textContent).toMatch(
  //     /profile picture/i,
  //   );
  //   expect(screen.queryByText("Edit").textContent).toMatch(/edit/i);
  //   // expect(
  //   //   screen.queryAllByRole("button", { name: "Send" })[0],
  //   // ).toBeInTheDocument();
  //   expect(screen.queryByText("First name:").textContent).toMatch(
  //     /first name:/i,
  //   );
  //   expect(
  //     screen.queryByText("First name must be between 1 and 30 characters")
  //       .textContent,
  //   ).toMatch(/first name must be between 1 and 30 characters/i);
  //   expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);
  //   expect(
  //     screen.queryByText("Last name must be between 1 and 30 characters")
  //       .textContent,
  //   ).toMatch(/last name must be between 1 and 30 characters/i);
  //   expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);
  //   expect(
  //     screen.queryByText("Username must be between 1 and 30 characters")
  //       .textContent,
  //   ).toMatch(/username must be between 1 and 30 characters/i);
  //   expect(screen.queryByText("Bio:").textContent).toMatch(/bio:/i);
  //   expect(
  //     screen.queryByText("Bio must be between 1 and 150 characters")
  //       .textContent,
  //   ).toMatch(/bio must be between 1 and 150 characters/i);
  //   expect(
  //     screen.queryByRole("button", { name: "save changes" }),
  //   ).toBeInTheDocument();
  // });
  // it("should log in navigate to EditUserProfile and render the errors", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/4", "/profile/edit/9"],
  //     initialIndex: 0,
  //   });
  //   render(<RouterProvider router={router} />);
  //   const user = userEvent.setup();
  //   await user.type(screen.getByTestId("username"), "test");
  //   expect(screen.getByTestId("username")).toHaveValue("test");
  //   await user.type(screen.getByTestId("password"), "12345678Bg@");
  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");
  //   const submitBtn = screen.queryAllByRole("button");
  //   await user.click(submitBtn[1]);
  //   // screen.debug();
  //   const loadingBtn = await screen.findByTestId("loading-btn");
  //   expect(loadingBtn).toBeInTheDocument();
  //   await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  //   expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
  //     /edit profile/i,
  //   );
  //   const manageUserProfileEditProfile = screen.queryAllByText("Edit Profile");
  //   await user.click(manageUserProfileEditProfile[1]);
  //   expect(screen.queryByText("Global").textContent).toMatch(/global/i);
  //   expect(screen.queryByText("Chats").textContent).toMatch(/chats/i);
  //   expect(screen.queryByText("Groups").textContent).toMatch(/groups/i);
  //   expect(screen.queryAllByText("Profile")[0].textContent).toMatch(/profile/i);
  //   expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);
  //   expect(screen.queryByText("Manage Profile").textContent).toMatch(
  //     /manage profile/i,
  //   );
  //   expect(screen.queryAllByText("Profile")[1].textContent).toMatch(/profile/i);
  //   expect(screen.queryByText("Edit Profile").textContent).toMatch(
  //     /edit profile/i,
  //   );
  //   expect(screen.queryByText("Change Password").textContent).toMatch(
  //     /change password/i,
  //   );
  //   expect(screen.queryByText("Profile Picture").textContent).toMatch(
  //     /profile picture/i,
  //   );
  //   expect(screen.queryByText("Edit").textContent).toMatch(/edit/i);
  //   // expect(
  //   //   screen.queryAllByRole("button", { name: "Send" })[0],
  //   // ).toBeInTheDocument();
  //   expect(screen.queryByText("First name:").textContent).toMatch(
  //     /first name:/i,
  //   );
  //   await user.type(screen.getByTestId("first_name"), "preslaw");
  //   expect(screen.getByTestId("first_name")).toHaveValue("preslaw");
  //   expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);
  //   await user.type(screen.getByTestId("last_name"), "preslaw");
  //   expect(screen.getByTestId("last_name")).toHaveValue("preslaw");
  //   expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);
  //   await user.type(screen.getByTestId("username"), "preslaw");
  //   expect(screen.getByTestId("username")).toHaveValue("preslaw");
  //   expect(screen.queryByText("Bio:").textContent).toMatch(/bio:/i);
  //   await user.type(screen.getByTestId("bio"), "test");
  //   expect(screen.getByTestId("bio")).toHaveValue("test");
  //   const saveChangesBtn = screen.queryByRole("button", {
  //     name: "save changes",
  //   });
  //   await user.click(saveChangesBtn);
  //   failedEditProfileServer.listen();
  //   failedEditProfileServer.resetHandlers();
  //   failedEditProfileServer.close();
  //   failedEditProfileServer.use(...failedEditProfileHandler);
  //   const firstNameErr = await screen.findByText("First name is already taken");
  //   expect(firstNameErr).toBeInTheDocument();
  //   const lastNameErr = await screen.findByText("Last name is already taken");
  //   expect(lastNameErr).toBeInTheDocument();
  //   const usernameErr = await screen.findByText("Username is already taken");
  //   expect(usernameErr).toBeInTheDocument();
  //   // screen.debug();
  // });
  // it("should navigate to EditProfile update the user information and render it", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/9", "/profile/edit/9"],
  //     initialIndex: 0,
  //   });
  //   render(<RouterProvider router={router} />);
  //   const user = userEvent.setup();
  //   await user.type(screen.getByTestId("username"), "test");
  //   expect(screen.getByTestId("username")).toHaveValue("test");
  //   await user.type(screen.getByTestId("password"), "12345678Bg@");
  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");
  //   const submitBtn = screen.queryAllByRole("button");
  //   await user.click(submitBtn[1]);
  //   // screen.debug();
  //   const loadingBtn = await screen.findByTestId("loading-btn");
  //   expect(loadingBtn).toBeInTheDocument();
  //   await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  //   expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
  //     /edit profile/i,
  //   );
  //   const manageUserProfileEditProfile = screen.queryAllByText("Edit Profile");
  //   await user.click(manageUserProfileEditProfile[1]);
  //   expect(screen.queryByText("Global").textContent).toMatch(/global/i);
  //   expect(screen.queryByText("Chats").textContent).toMatch(/chats/i);
  //   expect(screen.queryByText("Groups").textContent).toMatch(/groups/i);
  //   expect(screen.queryAllByText("Profile")[0].textContent).toMatch(/profile/i);
  //   expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);
  //   expect(screen.queryByText("Manage Profile").textContent).toMatch(
  //     /manage profile/i,
  //   );
  //   expect(screen.queryAllByText("Profile")[1].textContent).toMatch(/profile/i);
  //   expect(screen.queryByText("Edit Profile").textContent).toMatch(
  //     /edit profile/i,
  //   );
  //   expect(screen.queryByText("Change Password").textContent).toMatch(
  //     /change password/i,
  //   );
  //   expect(screen.queryByText("Profile Picture").textContent).toMatch(
  //     /profile picture/i,
  //   );
  //   expect(screen.queryByText("Edit").textContent).toMatch(/edit/i);
  //   // expect(
  //   //   screen.queryAllByRole("button", { name: "Send" })[0],
  //   // ).toBeInTheDocument();
  //   expect(screen.queryByText("First name:").textContent).toMatch(
  //     /first name:/i,
  //   );
  //   await user.type(screen.getByTestId("first_name"), "testt");
  //   expect(screen.getByTestId("first_name")).toHaveValue("testt");
  //   expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);
  //   await user.type(screen.getByTestId("last_name"), "testt");
  //   expect(screen.getByTestId("last_name")).toHaveValue("testt");
  //   expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);
  //   await user.type(screen.getByTestId("username"), "testt");
  //   expect(screen.getByTestId("username")).toHaveValue("testt");
  //   expect(screen.queryByText("Bio:").textContent).toMatch(/bio:/i);
  //   await user.type(screen.getByTestId("bio"), "bio");
  //   expect(screen.getByTestId("bio")).toHaveValue("bio");
  //   const saveChangesBtn = screen.queryByRole("button", {
  //     name: "save changes",
  //   });
  //   await user.click(saveChangesBtn);
  //   successEditProfileServer.listen();
  //   successEditProfileServer.resetHandlers();
  //   successEditProfileServer.close();
  //   successEditProfileServer.use(...successEditProfileHandler);
  //   const firstNameAndLastName = await screen.findByText("testt testt");
  //   expect(firstNameAndLastName).toBeInTheDocument();
  //   const username = await screen.findByText("@testt");
  //   expect(username).toBeInTheDocument();
  //   // screen.debug();
  // });
});
