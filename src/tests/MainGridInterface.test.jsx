import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/node/server";
import { http, HttpResponse } from "msw";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("should render MainGridInterface", () => {
  // it("should render Login form then navigate to UserProfile", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/4"],
  //     initialIndex: 0,
  //   });

  //   server.use(
  //     http.get("http://localhost:5000/users", () => {
  //       return HttpResponse.json(
  //         {
  //           id: 4,
  //           first_name: "preslaw",
  //           last_name: "preslaw",
  //           username: "preslaw",
  //           password: "12345678Bg@",
  //           confirm_password: "12345678Bg@",
  //           bio: "",
  //         },
  //         { status: 200 },
  //       );
  //     }),
  //   );

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByTestId("username"), "preslaw");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

  //   const submitBtn = screen.queryAllByRole("button");

  //   await user.click(submitBtn[1]);

  //   // screen.debug();

  //   await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

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

  //   server.use(
  //     http.get("http://localhost:5000/users", () => {
  //       return HttpResponse.json(
  //         {
  //           id: 4,
  //           first_name: "preslaw",
  //           last_name: "preslaw",
  //           username: "preslaw",
  //           password: "12345678Bg@",
  //           confirm_password: "12345678Bg@",
  //           bio: "",
  //         },
  //         { status: 200 },
  //       );
  //     }),
  //   );

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByTestId("username"), "preslaw");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

  //   const submitBtn = screen.queryAllByRole("button");
  //   // screen.debug();

  //   await user.click(submitBtn[1]);

  //   // const loadingBtn = await screen.findByTestId("loading-btn");

  //   // expect(loadingBtn).toBeInTheDocument();

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

  // it("should navigate to EditProfile update the user information and render it", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/4", "/profile/edit/4"],
  //     initialIndex: 0,
  //   });

  //   server.use(
  //     http.get("http://localhost:5000/users", () => {
  //       return HttpResponse.json(
  //         {
  //           id: 4,
  //           first_name: "preslaw123",
  //           last_name: "preslaw123",
  //           username: "preslaw123",
  //           password: "12345678Bg@",
  //           confirm_password: "12345678Bg@",
  //           bio: "bio123",
  //         },
  //         { status: 200 },
  //       );
  //     }),
  //   );

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByTestId("username"), "preslaw");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

  //   const submitBtn = screen.queryAllByRole("button");

  //   await user.click(submitBtn[1]);

  //   // screen.debug();

  //   // const loadingBtn = await screen.findByText("Loading...");

  //   // expect(loadingBtn).toBeInTheDocument();

  //   // await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

  //   // screen.debug();

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

  //   await user.type(screen.getByTestId("first_name"), "preslaw123");

  //   expect(screen.getByTestId("first_name")).toHaveValue("preslaw123");

  //   expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

  //   await user.type(screen.getByTestId("last_name"), "preslaw123");

  //   expect(screen.getByTestId("last_name")).toHaveValue("preslaw123");

  //   expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

  //   await user.type(screen.getByTestId("username"), "preslaw123");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw123");

  //   expect(screen.queryByText("Bio:").textContent).toMatch(/bio:/i);

  //   await user.type(screen.getByTestId("bio"), "bio123");

  //   expect(screen.getByTestId("bio")).toHaveValue("bio123");

  //   // screen.debug();

  //   const saveChangesBtn = screen.queryByRole("button", {
  //     name: "save changes",
  //   });

  //   await user.click(saveChangesBtn);

  //   // screen.debug();

  //   const firstNameAndLastName = await screen.findByText(
  //     "preslaw123 preslaw123",
  //   );

  //   expect(firstNameAndLastName).toBeInTheDocument();

  //   const username = await screen.findByText("@preslaw123");

  //   expect(username).toBeInTheDocument();
  // });

  // it("should log in navigate to EditUserProfile and render the errors", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/4", "/profile/edit/4"],
  //     initialIndex: 0,
  //   });

  //   server.use(
  //     http.get("http://localhost:5000/users", () => {
  //       return HttpResponse.json(
  //         {
  //           id: 4,
  //           first_name: "preslaw123",
  //           last_name: "preslaw123",
  //           username: "preslaw123",
  //           password: "12345678Bg@",
  //           confirm_password: "12345678Bg@",
  //           bio: "bio123",
  //         },
  //         { status: 200 },
  //       );
  //     }),
  //     http.put("http://localhost:5000/users/profile/edit/4", () => {
  //       return HttpResponse.json(
  //         [
  //           { msg: "First name is already taken" },
  //           { msg: "Last name is already taken" },
  //           { msg: "Username is already taken" },
  //         ],
  //         {
  //           status: 400,
  //         },
  //       );
  //     }),
  //   );

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByTestId("username"), "preslaw123");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw123");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

  //   const submitBtn = screen.queryAllByRole("button");

  //   await user.click(submitBtn[1]);

  //   // screen.debug();

  //   // const loadingBtn = await screen.findByTestId("loading-btn");

  //   // expect(loadingBtn).toBeInTheDocument();

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
  //   await user.type(screen.getByTestId("first_name"), "preslaw123");

  //   expect(screen.getByTestId("first_name")).toHaveValue("preslaw123");

  //   expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

  //   await user.type(screen.getByTestId("last_name"), "preslaw123");

  //   expect(screen.getByTestId("last_name")).toHaveValue("preslaw123");

  //   expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

  //   await user.type(screen.getByTestId("username"), "preslaw123");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw123");

  //   expect(screen.queryByText("Bio:").textContent).toMatch(/bio:/i);

  //   await user.type(screen.getByTestId("bio"), "bio123");

  //   expect(screen.getByTestId("bio")).toHaveValue("bio123");

  //   const saveChangesBtn = screen.queryByRole("button", {
  //     name: "save changes",
  //   });
  //   await user.click(saveChangesBtn);

  //   screen.debug();

  //   const firstNameErr = await screen.findByText("First name is already taken");

  //   expect(firstNameErr).toBeInTheDocument();

  //   const lastNameErr = await screen.findByText("Last name is already taken");

  //   expect(lastNameErr).toBeInTheDocument();

  //   const usernameErr = await screen.findByText("Username is already taken");

  //   expect(usernameErr).toBeInTheDocument();

  //   //   screen.debug();
  // });

  // it("should navigate to ChangeUserProfilePasswords and render the component", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/4", "/profile/change_passwords/4"],
  //     initialIndex: 0,
  //   });

  //   server.use(
  //     http.get("http://localhost:5000/users", () => {
  //       return HttpResponse.json(
  //         {
  //           id: 4,
  //           first_name: "preslaw123",
  //           last_name: "preslaw123",
  //           username: "preslaw123",
  //           password: "12345678Bg@",
  //           confirm_password: "12345678Bg@",
  //           bio: "bio123",
  //         },
  //         { status: 200 },
  //       );
  //     }),
  //   );

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByTestId("username"), "preslaw123");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw123");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

  //   const submitBtn = screen.queryAllByRole("button");

  //   await user.click(submitBtn[1]);

  //   // screen.debug();

  //   const changeUserProfilePasswords =
  //     await screen.findByText("Change Password");

  //   await user.click(changeUserProfilePasswords);

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

  //   expect(screen.queryByRole("button", { name: "Save" })).toBeInTheDocument();

  //   expect(screen.queryByText("Enter old password:").textContent).toMatch(
  //     /enter old password:/i,
  //   );

  //   expect(screen.queryByText("Enter new password:").textContent).toMatch(
  //     /enter new password:/i,
  //   );

  //   expect(
  //     screen.queryByText(
  //       "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
  //     ),
  //   ).toBeInTheDocument();

  //   expect(screen.queryByText("Confirm new password:").textContent).toMatch(
  //     /confirm new password:/i,
  //   );
  // });

  // it("should navigate to ChangeUserProfilePasswords and change the passwords", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/4", "/profile/change_passwords/4"],
  //     initialIndex: 0,
  //   });

  //   server.use(
  //     http.get("http://localhost:5000/users", () => {
  //       return HttpResponse.json(
  //         {
  //           id: 4,
  //           first_name: "preslaw123",
  //           last_name: "preslaw123",
  //           username: "preslaw123",
  //           password: "12345678Bg@",
  //           confirm_password: "12345678Bg@",
  //           bio: "bio123",
  //         },
  //         { status: 200 },
  //       );
  //     }),
  //   );

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByTestId("username"), "preslaw123");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw123");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

  //   const submitBtn = screen.queryAllByRole("button");

  //   await user.click(submitBtn[1]);

  //   // screen.debug();

  //   const changeUserProfilePasswords =
  //     await screen.findByText("Change Password");

  //   await user.click(changeUserProfilePasswords);

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

  //   expect(screen.queryByRole("button", { name: "Save" })).toBeInTheDocument();

  //   expect(screen.queryByText("Enter old password:").textContent).toMatch(
  //     /enter old password:/i,
  //   );

  //   expect(screen.queryByText("Enter new password:").textContent).toMatch(
  //     /enter new password:/i,
  //   );

  //   expect(screen.queryByText("Confirm new password:").textContent).toMatch(
  //     /confirm new password:/i,
  //   );

  //   await user.type(screen.getByTestId("old_password"), "12345678Bg@");

  //   expect(screen.getByTestId("old_password")).toHaveValue("12345678Bg@");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@@");

  //   await user.type(screen.getByTestId("confirm_password"), "12345678Bg@@");

  //   expect(screen.getByTestId("confirm_password")).toHaveValue("12345678Bg@@");

  //   expect(
  //     screen.queryByText(
  //       "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
  //     ),
  //   ).not.toBeInTheDocument();

  //   await user.click(screen.queryByRole("button", { name: "Save" }));

  //   expect(screen.queryByText("Profile updated")).toBeInTheDocument();

  //   expect(
  //     screen.queryByText("Your passwords has been updated successfully"),
  //   ).toBeInTheDocument();
  // });

  it("should navigate to ChangeUserProfilePasswords and render an error if old password doesn't match", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/profile/change_passwords/4"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/users", () => {
        return HttpResponse.json(
          {
            id: 4,
            first_name: "preslaw123",
            last_name: "preslaw123",
            username: "preslaw123",
            password: "12345678Bg@@",
            confirm_password: "12345678Bg@@",
            bio: "bio123",
          },
          { status: 200 },
        );
      }),
      http.put("http://localhost:5000/users/profile/change_passwords/4", () => {
        return HttpResponse.json(
          {
            msg: "Old password doesn't match.",
          },

          { status: 400 },
        );
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw123");

    expect(screen.getByTestId("username")).toHaveValue("preslaw123");

    await user.type(screen.getByTestId("password"), "12345678Bg@@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@@");

    // screen.debug();

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    const changeUserProfilePasswords =
      await screen.findByText("Change Password");

    await user.click(changeUserProfilePasswords);

    // screen.debug();

    expect(screen.queryByText("Global").textContent).toMatch(/global/i);

    expect(screen.queryByText("Chats").textContent).toMatch(/chats/i);

    expect(screen.queryByText("Groups").textContent).toMatch(/groups/i);

    expect(screen.queryAllByText("Profile")[0].textContent).toMatch(/profile/i);

    expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);

    expect(screen.queryByText("Manage Profile").textContent).toMatch(
      /manage profile/i,
    );

    expect(screen.queryAllByText("Profile")[1].textContent).toMatch(/profile/i);

    expect(screen.queryByText("Edit Profile").textContent).toMatch(
      /edit profile/i,
    );

    expect(screen.queryByText("Change Password").textContent).toMatch(
      /change password/i,
    );

    expect(screen.queryByRole("button", { name: "Save" })).toBeInTheDocument();

    expect(screen.queryByText("Enter old password:").textContent).toMatch(
      /enter old password:/i,
    );

    expect(screen.queryByText("Enter new password:").textContent).toMatch(
      /enter new password:/i,
    );

    expect(screen.queryByText("Confirm new password:").textContent).toMatch(
      /confirm new password:/i,
    );

    await user.type(screen.getByTestId("old_password"), "12345678Bg@");

    expect(screen.getByTestId("old_password")).toHaveValue("12345678Bg@");

    await user.type(screen.getByTestId("password"), "12345678Bg@@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@@");

    expect(
      screen.queryByText(
        "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
      ),
    ).not.toBeInTheDocument();

    await user.type(screen.getByTestId("confirm_password"), "12345678Bg@@");

    expect(screen.getByTestId("confirm_password")).toHaveValue("12345678Bg@@");

    screen.debug();

    await user.click(screen.queryByRole("button", { name: "Save" }));

    // console.log(screen.queryByRole("button", { name: "Save" }));

    screen.debug();

    const oldPasswordErr = await screen.findByText(
      "Old password doesn't match.",
    );

    expect(oldPasswordErr).toBeInTheDocument();
  });
});
