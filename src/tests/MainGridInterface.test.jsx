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

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

describe("should render MainGridInterface", () => {
  it("should render Login form then navigate to UserProfile", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/1"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    // screen.debug();

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    // screen.debug();

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    screen.debug();

    expect(screen.queryByText("Global").textContent).toMatch(/global/i);

    expect(screen.queryByText("Chats").textContent).toMatch(/chats/i);

    expect(screen.queryByText("Groups").textContent).toMatch(/groups/i);

    expect(screen.queryAllByText("Profile")[0].textContent).toMatch(/profile/i);

    expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);

    expect(screen.queryByText("Manage Profile").textContent).toMatch(
      /manage profile/i,
    );

    expect(screen.queryAllByText("Profile")[1].textContent).toMatch(/profile/i);

    expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
      /edit profile/i,
    );

    expect(screen.queryByText("Change Password").textContent).toMatch(
      /change password/i,
    );

    // expect(screen.queryByRole("button", { name: "Save" })).toBeInTheDocument();

    expect(screen.queryByText("preslaw preslaw").textContent).toMatch(
      /preslaw preslaw/i,
    );

    expect(screen.queryByText("@preslaw").textContent).toMatch(/@preslaw/);

    expect(screen.queryByTestId("user_presence")).toBeInTheDocument();

    expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
      /edit profile/i,
    );
  });

  it("should render Login form then navigate to EditUserProfile", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/profile/edit/4"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    // screen.debug();

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
      /edit profile/i,
    );

    const manageUserProfileEditProfile = screen.queryAllByText("Edit Profile");

    await user.click(manageUserProfileEditProfile[1]);

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

    expect(screen.queryByText("Profile Picture").textContent).toMatch(
      /profile picture/i,
    );

    expect(screen.queryByText("Edit").textContent).toMatch(/edit/i);

    // expect(
    //   screen.queryAllByRole("button", { name: "Send" })[0],
    // ).toBeInTheDocument();

    expect(screen.queryByText("First name:").textContent).toMatch(
      /first name:/i,
    );

    expect(
      screen.queryByText("First name must be between 1 and 30 characters")
        .textContent,
    ).toMatch(/first name must be between 1 and 30 characters/i);

    expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

    expect(
      screen.queryByText("Last name must be between 1 and 30 characters")
        .textContent,
    ).toMatch(/last name must be between 1 and 30 characters/i);

    expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

    expect(
      screen.queryByText("Username must be between 1 and 30 characters")
        .textContent,
    ).toMatch(/username must be between 1 and 30 characters/i);

    expect(screen.queryByText("Bio:").textContent).toMatch(/bio:/i);

    expect(
      screen.queryByText("Bio must be between 1 and 150 characters")
        .textContent,
    ).toMatch(/bio must be between 1 and 150 characters/i);

    expect(
      screen.queryByRole("button", { name: "save changes" }),
    ).toBeInTheDocument();
  });

  it("login then navigate to UserProfile and change the bg image", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
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

    expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
      /edit profile/i,
    );

    expect(screen.queryByText("Change Password").textContent).toMatch(
      /change password/i,
    );

    await user.click(screen.queryByTestId("background_image"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const bgImageInput = screen.getByTestId("background_image");

    await user.upload(bgImageInput, file);

    // screen.debug();

    expect(bgImageInput.files[0]).toBe(file);

    expect(bgImageInput.files.item(0)).toBe(file);

    expect(bgImageInput.files).toHaveLength(1);
  });

  it("login then navigate to UserProfile and change the profile image", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    expect(screen.queryByText("Global").textContent).toMatch(/global/i);

    expect(screen.queryByText("Chats").textContent).toMatch(/chats/i);

    expect(screen.queryByText("Groups").textContent).toMatch(/groups/i);

    expect(screen.queryAllByText("Profile")[0].textContent).toMatch(/profile/i);

    expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);

    expect(screen.queryByText("Manage Profile").textContent).toMatch(
      /manage profile/i,
    );

    expect(screen.queryAllByText("Profile")[1].textContent).toMatch(/profile/i);

    expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
      /edit profile/i,
    );

    expect(screen.queryByText("Change Password").textContent).toMatch(
      /change password/i,
    );

    const manageUserProfileEditProfile = screen.queryAllByText("Edit Profile");

    await user.click(manageUserProfileEditProfile[1]);

    await user.click(screen.queryByTestId("profile_image"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const profileImageInput = screen.getByTestId("profile_image");

    await user.upload(profileImageInput, file);

    // screen.debug();

    expect(profileImageInput.files[0]).toBe(file);

    expect(profileImageInput.files.item(0)).toBe(file);

    expect(profileImageInput.files).toHaveLength(1);

    // screen.debug();
  });

  it("should navigate to EditProfile update the user information and render it", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/profile/edit/4"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
      /edit profile/i,
    );

    const manageUserProfileEditProfile = screen.queryAllByText("Edit Profile");

    await user.click(manageUserProfileEditProfile[1]);
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

    expect(screen.queryByText("Profile Picture").textContent).toMatch(
      /profile picture/i,
    );

    expect(screen.queryByText("Edit").textContent).toMatch(/edit/i);
    // expect(
    //   screen.queryAllByRole("button", { name: "Send" })[0],
    // ).toBeInTheDocument();
    expect(screen.queryByText("First name:").textContent).toMatch(
      /first name:/i,
    );

    await user.type(screen.getByTestId("first_name"), "preslaw123");

    expect(screen.getByTestId("first_name")).toHaveValue("preslaw123");

    expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

    await user.type(screen.getByTestId("last_name"), "preslaw123");

    expect(screen.getByTestId("last_name")).toHaveValue("preslaw123");

    expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

    await user.type(screen.getByTestId("username"), "preslaw123");

    expect(screen.getByTestId("username")).toHaveValue("preslaw123");

    expect(screen.queryByText("Bio:").textContent).toMatch(/bio:/i);

    await user.type(screen.getByTestId("bio"), "bio123");

    expect(screen.getByTestId("bio")).toHaveValue("bio123");

    // screen.debug();

    const saveChangesBtn = screen.queryByRole("button", {
      name: "save changes",
    });

    await user.click(saveChangesBtn);
    // screen.debug();

    const firstNameAndLastName = await screen.findByText(
      "preslaw123 preslaw123",
    );

    expect(firstNameAndLastName).toBeInTheDocument();

    const username = await screen.findByText("@preslaw123");

    expect(username).toBeInTheDocument();
  });

  it("should log in navigate to EditUserProfile and render the errors", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/profile/edit/4"],
      initialIndex: 0,
    });

    server.use(
      http.put("http://localhost:5000/users/profile/edit/4", () => {
        return HttpResponse.json(
          [
            { msg: "First name is already taken" },
            { msg: "Last name is already taken" },
            { msg: "Username is already taken" },
          ],
          {
            status: 400,
          },
        );
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw123");

    expect(screen.getByTestId("username")).toHaveValue("preslaw123");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();
    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
      /edit profile/i,
    );

    const manageUserProfileEditProfile = screen.queryAllByText("Edit Profile");

    await user.click(manageUserProfileEditProfile[1]);

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

    expect(screen.queryByText("Profile Picture").textContent).toMatch(
      /profile picture/i,
    );

    expect(screen.queryByText("Edit").textContent).toMatch(/edit/i);

    // expect(
    //   screen.queryAllByRole("button", { name: "Send" })[0],
    // ).toBeInTheDocument();

    expect(screen.queryByText("First name:").textContent).toMatch(
      /first name:/i,
    );

    await user.type(screen.getByTestId("first_name"), "preslaw123");

    expect(screen.getByTestId("first_name")).toHaveValue("preslaw123");

    expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

    await user.type(screen.getByTestId("last_name"), "preslaw123");

    expect(screen.getByTestId("last_name")).toHaveValue("preslaw123");

    expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

    await user.type(screen.getByTestId("username"), "preslaw123");

    expect(screen.getByTestId("username")).toHaveValue("preslaw123");

    expect(screen.queryByText("Bio:").textContent).toMatch(/bio:/i);

    await user.type(screen.getByTestId("bio"), "bio123");

    expect(screen.getByTestId("bio")).toHaveValue("bio123");

    const saveChangesBtn = screen.queryByRole("button", {
      name: "save changes",
    });

    await user.click(saveChangesBtn);

    const firstNameErr = await screen.findByText("First name is already taken");

    expect(firstNameErr).toBeInTheDocument();

    const lastNameErr = await screen.findByText("Last name is already taken");

    expect(lastNameErr).toBeInTheDocument();

    const usernameErr = await screen.findByText("Username is already taken");

    expect(usernameErr).toBeInTheDocument();
  });

  it("should navigate to ChangeUserProfilePasswords and render the component", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/profile/change_passwords/4"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw123");

    expect(screen.getByTestId("username")).toHaveValue("preslaw123");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

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

    expect(
      screen.queryByText(
        "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
      ),
    ).toBeInTheDocument();

    expect(screen.queryByText("Confirm new password:").textContent).toMatch(
      /confirm new password:/i,
    );
  });

  it("should navigate to ChangeUserProfilePasswords and change the passwords", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/profile/change_passwords/4"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw123");

    expect(screen.getByTestId("username")).toHaveValue("preslaw123");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

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

    await user.type(screen.getByTestId("confirm_password"), "12345678Bg@@");

    expect(screen.getByTestId("confirm_password")).toHaveValue("12345678Bg@@");

    expect(
      screen.queryByText(
        "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
      ),
    ).not.toBeInTheDocument();

    await user.click(screen.queryByRole("button", { name: "Save" }));

    expect(screen.queryByText("Profile updated")).toBeInTheDocument();

    expect(
      screen.queryByText("Your passwords has been updated successfully"),
    ).toBeInTheDocument();
  });

  it("should navigate to ChangeUserProfilePasswords and render an error if old password doesn't match", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/profile/change_passwords/4"],
      initialIndex: 0,
    });

    server.use(
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

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
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

    // screen.debug();

    await user.click(screen.queryByRole("button", { name: "Save" }));

    // console.log(screen.queryByRole("button", { name: "Save" }));
    // screen.debug();

    const oldPasswordErr = await screen.findByText(
      "Old password doesn't match.",
    );

    expect(oldPasswordErr).toBeInTheDocument();
  });

  it("should login and navigate to chats and render that you have no chats", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/chats"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/chats", () => {
        return HttpResponse.json([]);
      }),

      http.get("http://localhost:5000/chats/undefined", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();
    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    await user.click(screen.queryByText("Chats"));

    // screen.debug();

    expect(screen.queryByRole("heading", { level: 4 }).textContent).toMatch(
      /chats/i,
    );

    expect(
      screen.queryByText("You currently have no chats").textContent,
    ).toMatch(/you currently have no chats/i);

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /chats/i,
    );

    // screen.debug();
  });

  it("should login navigate to chats and render all users", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/chats"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/chats/undefined", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    // screen.debug();

    await user.click(screen.queryByText("Chats"));

    await user.click(
      screen.queryByAltText("click to toggle and search for a user"),
    );

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { level: 5 })[0].textContent,
    ).toMatch(/search users/i);

    expect(
      screen.queryAllByRole("heading", { level: 5 })[1].textContent,
    ).toMatch(/chats/i);

    expect(screen.queryByText("preslaw preslaw").textContent).toMatch(
      /preslaw preslaw/i,
    );

    expect(screen.queryByText("@preslaw").textContent).toMatch(/@preslaw/i);

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw1/i);

    expect(screen.queryByText("preslaw2 preslaw2").textContent).toMatch(
      /preslaw2 preslaw2/i,
    );

    expect(screen.queryByText("@preslaw2").textContent).toMatch(/@preslaw2/i);

    // screen.debug();
  });

  it("should navigate to chats, type a user, and return perfect match", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/chats"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/chats/undefined", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Chats"));

    await user.click(
      screen.queryByAltText("click to toggle and search for a user"),
    );

    expect(
      screen.queryAllByRole("heading", { level: 5 })[0].textContent,
    ).toMatch(/search users/i);

    expect(
      screen.queryAllByRole("heading", { level: 5 })[1].textContent,
    ).toMatch(/chats/i);

    // console.log(screen.getByTestId("user"));

    await user.type(screen.getByTestId("user"), "preslaw1");

    expect(screen.getByTestId("user")).toHaveValue("preslaw1");

    expect(screen.queryByText("preslaw preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw1/i);

    expect(screen.queryByText("preslaw2 preslaw2")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw2")).not.toBeInTheDocument();

    // screen.debug();
  });

  it("navigate to chats and start conversation with a user", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/chats", "/profile/5"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/chats/undefined", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Chats"));

    // screen.debug();

    await user.click(
      screen.queryByAltText("click to toggle and search for a user"),
    );

    expect(
      screen.queryAllByRole("heading", { level: 5 })[0].textContent,
    ).toMatch(/search users/i);

    expect(
      screen.queryAllByRole("heading", { level: 5 })[1].textContent,
    ).toMatch(/chats/i);

    // console.log(screen.getByTestId("user"));

    await user.type(screen.getByTestId("user"), "preslaw1");

    expect(screen.getByTestId("user")).toHaveValue("preslaw1");

    // screen.debug();

    expect(screen.queryByText("preslaw preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw1/i);

    expect(screen.queryByText("preslaw2 preslaw2")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw2")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("userAnchor"));

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    screen.debug();

    expect(screen.queryAllByText("preslaw1 preslaw1")[0].textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryAllByText("@preslaw1")[0].textContent).toMatch(
      /@preslaw1/i,
    );

    expect(screen.queryByRole("heading", { level: 6 }).textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("start conversation with another user and send a message", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/chats", "/profile/5"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/chats/undefined", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Chats"));

    // screen.debug();

    await user.click(
      screen.queryByAltText("click to toggle and search for a user"),
    );

    expect(
      screen.queryAllByRole("heading", { level: 5 })[0].textContent,
    ).toMatch(/search users/i);

    expect(
      screen.queryAllByRole("heading", { level: 5 })[1].textContent,
    ).toMatch(/chats/i);

    // console.log(screen.getByTestId("user"));

    await user.type(screen.getByTestId("user"), "preslaw1");

    expect(screen.getByTestId("user")).toHaveValue("preslaw1");

    // screen.debug();

    expect(screen.queryByText("preslaw preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw1/i);

    expect(screen.queryByText("preslaw2 preslaw2")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw2")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("userAnchor"));

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    // screen.debug();

    expect(screen.queryAllByText("preslaw1 preslaw1")[0].textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryAllByText("@preslaw1")[0].textContent).toMatch(
      /@preslaw1/i,
    );

    expect(screen.queryByRole("heading", { level: 6 }).textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    // screen.debug();

    await user.type(screen.queryByTestId("message_text"), "hello!");

    expect(screen.queryByTestId("message_text")).toHaveValue("hello!");

    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.queryByText("hello!").textContent).toMatch(/hello!/i);

    // screen.debug();
  });

  it("start conversation with another user and send a image", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/chats", "/profile/5"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/chats/undefined", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Chats"));

    // screen.debug();

    await user.click(
      screen.queryByAltText("click to toggle and search for a user"),
    );

    expect(
      screen.queryAllByRole("heading", { level: 5 })[0].textContent,
    ).toMatch(/search users/i);

    expect(
      screen.queryAllByRole("heading", { level: 5 })[1].textContent,
    ).toMatch(/chats/i);

    // console.log(screen.getByTestId("user"));

    await user.type(screen.getByTestId("user"), "preslaw1");

    expect(screen.getByTestId("user")).toHaveValue("preslaw1");

    // screen.debug();

    expect(screen.queryByText("preslaw preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw1/i);

    expect(screen.queryByText("preslaw2 preslaw2")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw2")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("userAnchor"));

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    // screen.debug();

    expect(screen.queryAllByText("preslaw1 preslaw1")[0].textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryAllByText("@preslaw1")[0].textContent).toMatch(
      /@preslaw1/i,
    );

    expect(screen.queryByRole("heading", { level: 6 }).textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.click(screen.queryByTestId("message_image"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const messageImageInput = screen.getByTestId("message_image");

    await user.upload(messageImageInput, file);

    // screen.debug();

    expect(messageImageInput.files[0]).toBe(file);

    expect(messageImageInput.files.item(0)).toBe(file);

    expect(messageImageInput.files).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Send" }));

    // screen.debug();
  });

  it("should edit message in chat", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/chats", "/profile/5"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/chats/undefined", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Chats"));

    // screen.debug();

    await user.click(
      screen.queryByAltText("click to toggle and search for a user"),
    );

    expect(
      screen.queryAllByRole("heading", { level: 5 })[0].textContent,
    ).toMatch(/search users/i);

    expect(
      screen.queryAllByRole("heading", { level: 5 })[1].textContent,
    ).toMatch(/chats/i);

    // console.log(screen.getByTestId("user"));

    await user.type(screen.getByTestId("user"), "preslaw1");

    expect(screen.getByTestId("user")).toHaveValue("preslaw1");

    // screen.debug();

    expect(screen.queryByText("preslaw preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw1/i);

    expect(screen.queryByText("preslaw2 preslaw2")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw2")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("userAnchor"));

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    // screen.debug();

    expect(screen.queryAllByText("preslaw1 preslaw1")[0].textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryAllByText("@preslaw1")[0].textContent).toMatch(
      /@preslaw1/i,
    );

    expect(screen.queryByRole("heading", { level: 6 }).textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.type(screen.queryByTestId("message_text"), "hello!");

    expect(screen.queryByTestId("message_text")).toHaveValue("hello!");

    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.queryByText("hello!").textContent).toMatch(/hello!/i);

    await user.click(screen.getByAltText("message drop-down menu"));

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Edit" }));

    const editMessageInput = screen.queryByTestId("message_text");

    await user.clear(editMessageInput);

    await user.type(editMessageInput, "edited message");

    expect(editMessageInput).toHaveValue("edited message");

    await user.click(screen.getByRole("button", { name: "Save" }));

    // screen.debug();

    expect(screen.queryByText("edited message").textContent).toMatch(
      /edited message/i,
    );
  });

  it("should delete a message in chat", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/chats", "/profile/5"],
      initialIndex: 0,
    });

    server.use(
      http.get("http://localhost:5000/chats/undefined", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Chats"));

    // screen.debug();

    await user.click(
      screen.queryByAltText("click to toggle and search for a user"),
    );

    expect(
      screen.queryAllByRole("heading", { level: 5 })[0].textContent,
    ).toMatch(/search users/i);

    expect(
      screen.queryAllByRole("heading", { level: 5 })[1].textContent,
    ).toMatch(/chats/i);

    // console.log(screen.getByTestId("user"));

    await user.type(screen.getByTestId("user"), "preslaw1");

    expect(screen.getByTestId("user")).toHaveValue("preslaw1");

    // screen.debug();

    expect(screen.queryByText("preslaw preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw")).not.toBeInTheDocument();

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw1/i);

    expect(screen.queryByText("preslaw2 preslaw2")).not.toBeInTheDocument();

    expect(screen.queryByText("@preslaw2")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("userAnchor"));

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    // screen.debug();

    expect(screen.queryAllByText("preslaw1 preslaw1")[0].textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryAllByText("@preslaw1")[0].textContent).toMatch(
      /@preslaw1/i,
    );

    expect(screen.queryByRole("heading", { level: 6 }).textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.type(screen.queryByTestId("message_text"), "hello!");

    expect(screen.queryByTestId("message_text")).toHaveValue("hello!");

    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.queryByText("hello!").textContent).toMatch(/hello!/i);

    await user.click(screen.getByAltText("message drop-down menu"));

    // screen.debug();

    await user.click(screen.getByRole("button", { name: "Delete" }));

    // console.log(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("hello")).not.toBeInTheDocument();

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    // screen.debug();
  });

  it("should show no groups if there are not any", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/5", "/groups"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    await user.click(screen.queryByText("Groups"));

    expect(screen.queryByText("Loading..."));

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(
      screen.queryAllByRole("heading", { leven: 5 })[1].textContent,
    ).toMatch(/groups/i);

    expect(
      screen.queryByText("You currently have no groups").textContent,
    ).toMatch(/you currently have no groups/i);

    // screen.debug();
  });

  it("should render group create route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/5", "/groups/create"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters")
        .textContent,
    ).toMatch(/group name must be between 3 and 30 characters/i);

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    // screen.debug();
  });

  it("should create a group between two users", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/groups", "/groups/create"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    screen.debug();

    expect(screen.queryAllByText("group")[0].textContent).toMatch(/group/i);

    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();

    expect(
      screen.queryByText(
        "You must join a group first before sending a message!",
      ).textContent,
    ).toMatch(/you must join a group first before sending a message!/i);
  });

  it("should fail to create a group if the name is less than 3 characters", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/groups", "/groups/create"],
      initialIndex: 0,
    });

    server.use(
      http.post("http://localhost:5000/groups", async () => {
        return HttpResponse.json(
          [
            {
              msg: "Group name must be between 3 and 30 characters",
            },
          ],
          { status: 400 },
        );
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "gr");

    expect(screen.queryByTestId("group_name"), "gr");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    // screen.debug();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    // screen.debug();
  });

  it("should fail to create a group if the name already exists", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/groups", "/groups/create"],
      initialIndex: 0,
    });

    server.use(
      http.post("http://localhost:5000/groups", async () => {
        return HttpResponse.json(
          [
            {
              msg: "Group name already exists",
            },
          ],
          { status: 400 },
        );
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    // screen.debug();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.queryByText("Group name already exists"));
  });

  it("should fail to create a group if image is not selected", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/groups", "/groups/create"],
      initialIndex: 0,
    });

    server.use(
      http.post("http://localhost:5000/groups", async () => {
        return HttpResponse.json(
          [
            {
              msg: "Please choose an image for the group",
            },
          ],
          { status: 400 },
        );
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    // screen.debug();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(
      screen.queryByText("Please choose an image for the group").textContent,
    ).toMatch(/please choose an image for the group/i);

    // screen.debug();
  });

  it("user should join able to join a group", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [
        "/login",
        "/profile/4",
        "/groups",
        "/groups/create",
        "/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/join",
      ],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.queryByText("Loading..."));

    // screen.debug();

    expect(screen.queryAllByText("group")[0].textContent).toMatch(/group/i);

    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Join" }));

    screen.debug();

    expect(screen.getByRole("button", { name: "Joined" })).toBeInTheDocument();

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("should send a message in group", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [
        "/login",
        "/profile/4",
        "/groups",
        "/groups/create",
        "/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/join",
        "/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/message",
      ],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.findByText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    // screen.debug();

    expect(screen.queryAllByText("group")[0].textContent).toMatch(/group/i);

    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Join" }));

    // screen.debug();

    expect(screen.getByRole("button", { name: "Joined" })).toBeInTheDocument();

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.type(screen.getByTestId("message_text"), "hello");

    expect(screen.getByTestId("message_text"), "hello");

    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.queryByText("hello").textContent).toMatch(/hello/i);

    // screen.debug();
  });

  it("should send a image in group", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [
        "/login",
        "/profile/4",
        "/groups",
        "/groups/create",
        "/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/join",
        "/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/image",
      ],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    let file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    // screen.debug();

    expect(screen.queryAllByText("group")[0].textContent).toMatch(/group/i);

    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Join" }));

    // screen.debug();

    expect(screen.getByRole("button", { name: "Joined" })).toBeInTheDocument();

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.click(screen.queryByTestId("message_image"));

    file = new File(["image"], "image.png", {
      type: "image/png",
    });

    const messageImageInput = screen.getByTestId("message_image");

    await user.upload(messageImageInput, file);

    expect(messageImageInput.files[0]).toBe(file);

    expect(messageImageInput.files.item(0)).toBe(file);

    expect(messageImageInput.files).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Send" }));

    // screen.debug();
  });

  it("should edit a message in group", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [
        "/login",
        "/profile/4",
        "/groups",
        "/groups/create",
        "/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/join",
        "/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/message",
      ],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    let file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    // screen.debug();

    expect(screen.queryAllByText("group")[0].textContent).toMatch(/group/i);

    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Join" }));

    screen.debug();

    expect(screen.getByRole("button", { name: "Joined" })).toBeInTheDocument();

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.click(screen.queryByTestId("message_image"));

    file = new File(["image"], "image.png", {
      type: "image/png",
    });

    await user.type(screen.getByTestId("message_text"), "hello");

    expect(screen.getByTestId("message_text"), "hello");

    await user.click(screen.getByRole("button", { name: "Send" }));

    await user.click(screen.getByAltText("message drop-down menu"));

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Edit" }));

    await user.clear(screen.getAllByTestId("message_text")[0], "");

    await user.type(screen.getAllByTestId("message_text")[0], "new message");

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getAllByTestId("message_text")[1], "new message");

    expect(screen.queryByText("new message").textContent).toMatch(
      /new message/,
    );

    // screen.debug();
  });

  it("should delete a message in group", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/4", "/groups", "/groups/create"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();
    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    // screen.debug();

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    let file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw1");

    expect(screen.queryByTestId("group_member"), "preslaw1");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    // screen.debug();

    expect(screen.queryAllByText("group")[0].textContent).toMatch(/group/i);

    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Join" }));

    // screen.debug();

    expect(screen.getByRole("button", { name: "Joined" })).toBeInTheDocument();

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.click(screen.queryByTestId("message_image"));

    file = new File(["image"], "image.png", {
      type: "image/png",
    });

    await user.type(screen.getByTestId("message_text"), "hello");

    expect(screen.getByTestId("message_text"), "hello");

    await user.click(screen.getByRole("button", { name: "Send" }));

    await user.click(screen.getByAltText("message drop-down menu"));

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    // screen.debug();
  });

  it("should't not render specific buttons if the user is not the creator of the group", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/5", "/groups"],
      initialIndex: 0,
    });

    server.use(
      http.post("http://localhost:5000/users/login", async () => {
        return HttpResponse.json(
          {
            id: 2,
            username: "preslaw1",
            password: "12345678Bg@",
          },
          { status: 200 },
        );
      }),

      http.get("http://localhost:5000/users", async () => {
        return HttpResponse.json(
          {
            id: 2,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
          },
          { status: 200 },
        );
      }),

      http.get("http://localhost:5000/users/2", async () => {
        return HttpResponse.json(
          {
            id: 2,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
            password: "12345678Bg@",
            confirm_password: "12345678Bg@",
            bio: "",
            profile_picture: "",
            background_picture: "",
          },
          { status: 200 },
        );
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw1");

    expect(screen.getByTestId("username")).toHaveValue("preslaw1");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    let file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw2");

    expect(screen.queryByTestId("group_member"), "preslaw2");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    screen.debug();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.queryByText("Loading..."));

    expect(
      screen.queryByRole("button", { name: "Edit" }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Delete" }),
    ).not.toBeInTheDocument();

    // screen.debug();
  });

  it("should render the specific buttons if the user is the creator of the group", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/1", "/groups"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw1");

    expect(screen.getByTestId("username")).toHaveValue("preslaw1");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    await user.click(screen.queryByText("Groups"));

    await user.click(screen.queryByTestId("groupAnchor"));

    expect(
      screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
    ).toMatch(/groups/i);

    expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
      .toMatch;

    expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
      /create group/i,
    );

    expect(screen.queryByText("Group Profile").textContent).toMatch(
      /group profile/i,
    );

    expect(screen.queryByText("Group name:").textContent).toMatch(
      /group name:/i,
    );

    expect(screen.queryByText("Select members:").textContent).toMatch(
      /select members/i,
    );

    await user.click(screen.queryByTestId("group_image"));

    let file = new File(["image"], "image.png", { type: "image/png" });

    const groupImageInput = screen.getByTestId("group_image");

    await user.upload(groupImageInput, file);

    expect(groupImageInput.files[0]).toBe(file);

    expect(groupImageInput.files.item(0)).toBe(file);

    expect(groupImageInput.files).toHaveLength(1);

    await user.type(screen.queryByTestId("group_name"), "test");

    expect(screen.queryByTestId("group_name"), "test");

    expect(
      screen.queryByText("Group name must be between 3 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.queryByTestId("group_member"), "preslaw2");

    expect(screen.queryByTestId("group_member"), "preslaw2");

    const selectMember = screen.queryByTestId("select_member");

    await user.click(selectMember);

    expect(
      screen.queryByRole("button", { name: "Create Group" }),
    ).toBeInTheDocument();

    // screen.debug();

    await user.click(screen.queryByRole("button", { name: "Create Group" }));

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    screen.debug();

    expect(screen.queryByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Delete" }),
    ).toBeInTheDocument();

    // screen.debug();
  });

  // it("should update the group name", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/1", "/groups"],
  //     initialIndex: 0,
  //   });

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByTestId("username"), "preslaw1");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw1");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

  //   const submitBtn = screen.queryAllByRole("button");

  //   await user.click(submitBtn[1]);

  //   // screen.debug();

  //   expect(screen.queryByText("Loading..."));

  //   await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

  //   // screen.debug();

  //   await user.click(screen.queryByText("Groups"));

  //   await user.click(screen.queryByTestId("groupAnchor"));

  //   expect(
  //     screen.queryAllByRole("heading", { leven: 4 })[0].textContent,
  //   ).toMatch(/groups/i);

  //   expect(screen.queryAllByRole("heading", { leven: 5 })[1].textContent)
  //     .toMatch;

  //   expect(screen.queryByRole("heading", { level: 5 }).textContent).toMatch(
  //     /create group/i,
  //   );

  //   expect(screen.queryByText("Group Profile").textContent).toMatch(
  //     /group profile/i,
  //   );

  //   expect(screen.queryByText("Group name:").textContent).toMatch(
  //     /group name:/i,
  //   );

  //   expect(screen.queryByText("Select members:").textContent).toMatch(
  //     /select members/i,
  //   );

  //   await user.click(screen.queryByTestId("group_image"));

  //   let file = new File(["image"], "image.png", { type: "image/png" });

  //   const groupImageInput = screen.getByTestId("group_image");

  //   await user.upload(groupImageInput, file);

  //   expect(groupImageInput.files[0]).toBe(file);

  //   expect(groupImageInput.files.item(0)).toBe(file);

  //   expect(groupImageInput.files).toHaveLength(1);

  //   await user.type(screen.queryByTestId("group_name"), "test");

  //   expect(screen.queryByTestId("group_name"), "test");

  //   expect(
  //     screen.queryByText("Group name must be between 3 and 30 characters"),
  //   ).not.toBeInTheDocument();

  //   await user.type(screen.queryByTestId("group_member"), "preslaw2");

  //   expect(screen.queryByTestId("group_member"), "preslaw2");

  //   const selectMember = screen.queryByTestId("select_member");

  //   await user.click(selectMember);

  //   expect(
  //     screen.queryByRole("button", { name: "Create Group" }),
  //   ).toBeInTheDocument();

  //   // screen.debug();

  //   await user.click(screen.queryByRole("button", { name: "Create Group" }));

  //   expect(screen.queryByText("Loading..."));

  //   // screen.debug();

  //   expect(screen.queryByRole("button", { name: "Edit" })).toBeInTheDocument();

  //   expect(
  //     screen.queryByRole("button", { name: "Delete" }),
  //   ).toBeInTheDocument();

  //   await user.click(screen.queryByRole("button", { name: "Edit" }));

  //   screen.debug();

  //   await user.type(screen.queryByTestId("group_name"), "edited group");

  //   expect(screen.queryByTestId("group_name"), "edited group");

  //   screen.debug();

  //   await user.click(screen.queryAllByRole("button", { name: "Send" })[0]);

  //   // screen.debug();
  // });

  // it("should navigate to globalChat", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/profile/1", "/globalChat"],
  //     initialIndex: 0,
  //   });

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByTestId("username"), "preslaw1");

  //   expect(screen.getByTestId("username")).toHaveValue("preslaw1");

  //   await user.type(screen.getByTestId("password"), "12345678Bg@");

  //   expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

  //   const submitBtn = screen.queryAllByRole("button");

  //   await user.click(submitBtn[1]);

  //   // screen.debug();

  //   expect(screen.queryByText("Loading..."));

  //   await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

  //   await user.click(screen.queryByTestId("global_chat"));

  //   expect(screen.queryByText("Search Users").textContent).toMatch(
  //     /search users/i,
  //   );

  //   expect(screen.queryByText("preslaw preslaw").textContent).toMatch(
  //     /preslaw preslaw/i,
  //   );

  //   expect(screen.queryByText("@preslaw").textContent).toMatch(/@preslaw/i);

  //   expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
  //     /preslaw1 preslaw1/i,
  //   );

  //   expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw1/i);

  //   expect(screen.queryByText("Global Chat").textContent).toMatch(
  //     /global chat/i,
  //   );

  //   expect(
  //     screen.queryByText("Start a conversation, say Hi!").textContent,
  //   ).toMatch(/start a conversation, say hi!/i);

  //   expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

  //   screen.debug();
  // });

  it("should navigate to globalChat and search for a user", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/1", "/globalChat"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw1");

    expect(screen.getByTestId("username")).toHaveValue("preslaw1");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    await user.click(screen.queryByTestId("global_chat"));

    expect(screen.queryByText("Global Chat").textContent).toMatch(
      /global chat/i,
    );

    expect(screen.queryByText("Search Users").textContent).toMatch(
      /search users/i,
    );

    await user.type(screen.queryByTestId("user"), "preslaw");

    expect(screen.queryByTestId("user")).toHaveValue("preslaw");

    screen.debug();

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw/i);

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("should navigate to globalChat and send a message", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/1", "/globalChat"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw1");

    expect(screen.getByTestId("username")).toHaveValue("preslaw1");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    await user.click(screen.queryByTestId("global_chat"));

    expect(screen.queryByText("Global Chat").textContent).toMatch(
      /global chat/i,
    );

    expect(screen.queryByText("Search Users").textContent).toMatch(
      /search users/i,
    );

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw/i);

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.type(screen.queryByTestId("message_text"), "hello");

    expect(user.type(screen.queryByTestId("message_text"), "hello"));

    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.queryByText("hello").textContent).toMatch(/hello/i);

    screen.debug();
  });

  it("should navigate to globalChat and send a image", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/1", "/globalChat"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw1");

    expect(screen.getByTestId("username")).toHaveValue("preslaw1");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    await user.click(screen.queryByTestId("global_chat"));

    expect(screen.queryByText("Global Chat").textContent).toMatch(
      /global chat/i,
    );

    expect(screen.queryByText("Search Users").textContent).toMatch(
      /search users/i,
    );

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw/i);

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.click(screen.queryByTestId("message_image"));

    let file = new File(["image"], "image.png", { type: "image/png" });

    const globalChatImageInput = screen.getByTestId("message_image");

    await user.upload(globalChatImageInput, file);

    expect(globalChatImageInput.files[0]).toBe(file);

    expect(globalChatImageInput.files.item(0)).toBe(file);

    expect(globalChatImageInput.files).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Send" }));

    screen.debug();
  });

  it("should navigate to globalChat and edit a message", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/1", "/globalChat"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw1");

    expect(screen.getByTestId("username")).toHaveValue("preslaw1");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    await user.click(screen.queryByTestId("global_chat"));

    expect(screen.queryByText("Global Chat").textContent).toMatch(
      /global chat/i,
    );

    expect(screen.queryByText("Search Users").textContent).toMatch(
      /search users/i,
    );

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw/i);

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.type(screen.queryByTestId("message_text"), "hello");

    expect(user.type(screen.queryByTestId("message_text"), "hello"));

    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.queryByText("hello").textContent).toMatch(/hello/i);

    await user.click(screen.queryByAltText("message drop-down menu"));

    await user.click(screen.getByRole("button", { name: "Edit" }));

    await user.clear(screen.queryAllByTestId("message_text")[0], "");

    await user.type(
      screen.queryAllByTestId("message_text")[0],
      "edited message",
    );

    expect(
      user.type(screen.queryAllByTestId("message_text")[0], "edited message"),
    );

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.queryByText("edited message").textContent).toMatch(
      /edited message/i,
    );

    screen.debug();

    await user.click(screen.getByRole("button", { name: "Send" }));
  });

  it("should navigate to globalChat and delete a message", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/1", "/globalChat"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw1");

    expect(screen.getByTestId("username")).toHaveValue("preslaw1");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    // screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    await user.click(screen.queryByTestId("global_chat"));

    expect(screen.queryByText("Global Chat").textContent).toMatch(
      /global chat/i,
    );

    expect(screen.queryByText("Search Users").textContent).toMatch(
      /search users/i,
    );

    expect(screen.queryByText("preslaw1 preslaw1").textContent).toMatch(
      /preslaw1 preslaw1/i,
    );

    expect(screen.queryByText("@preslaw1").textContent).toMatch(/@preslaw/i);

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();

    await user.type(screen.queryByTestId("message_text"), "hello");

    expect(user.type(screen.queryByTestId("message_text"), "hello"));

    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.queryByText("hello").textContent).toMatch(/hello/i);

    await user.click(screen.queryByAltText("message drop-down menu"));

    await user.click(screen.getByRole("button", { name: "Delete" }));

    await user.clear(screen.queryAllByTestId("message_text")[0], "");

    expect(
      screen.queryByText("Start a conversation, say Hi!").textContent,
    ).toMatch(/start a conversation, say hi!/i);

    screen.debug();
  });
});
