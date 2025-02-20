import { render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach } from "vitest";
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

describe("should render SignUpForm", () => {
  it("should render the content of this component", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    // screen.debug();

    expect(screen.queryByText("Wemessage").textContent).toMatch(/wemessage/i);

    expect(screen.queryByRole("h1"), { name: "Sign up" });

    expect(screen.queryByText("First name:").textContent).toMatch(
      /first name:/i,
    );

    expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

    expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

    expect(screen.queryByText("Password:").textContent).toMatch(/password:/i);

    expect(screen.queryByText("Confirm Password:").textContent).toMatch(
      /confirm password:/i,
    );

    expect(screen.queryByText("Already have an account?").textContent).toMatch(
      /already have an account?/i,
    );

    expect(screen.queryByText("Log In").textContent).toMatch(/log in/i);

    expect(screen.queryByRole("button"), { name: "Submit" });
  });

  it("should render content and span errors", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    // screen.debug();

    expect(screen.queryByText("Wemessage").textContent).toMatch(/wemessage/i);

    expect(screen.queryByRole("h1"), { name: "Sign up" });

    expect(screen.queryByText("First name:").textContent).toMatch(
      /first name:/i,
    );

    expect(
      screen.queryByText("First name must be between 1 and 30 characters")
        .textContent,
    ).toMatch(/first name must be between 1 and 30 characters/i);

    expect(
      screen.queryByText("Last name must be between 1 and 30 characters")
        .textContent,
    ).toMatch(/last name must be between 1 and 30 characters/i);

    expect(
      screen.queryByText("Username must be between 1 and 30 characters")
        .textContent,
    ).toMatch(/username must be between 1 and 30 characters/i);

    expect(
      screen.queryByText(
        "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
      ).textContent,
    ).toMatch(
      /password must be 8 characters long, and contain one lower, one uppercase and one special character/i,
    );

    expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

    expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

    expect(screen.queryByText("Password:").textContent).toMatch(/password:/i);

    expect(screen.queryByText("Confirm Password:").textContent).toMatch(
      /confirm password:/i,
    );

    expect(screen.queryByText("Already have an account?").textContent).toMatch(
      /already have an account?/i,
    );

    expect(screen.queryByText("Log In").textContent).toMatch(/log in/i);

    expect(screen.queryByRole("button"), { name: "Submit" });
  });

  it("should hide span errors when user types", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    // screen.debug();

    const user = userEvent.setup();

    await user.type(screen.getByTestId("first_name"), "preslaw");

    expect(screen.getByTestId("first_name")).toHaveValue("preslaw");

    expect(
      screen.queryByText("First name must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.getByTestId("last_name"), "preslaw");

    expect(screen.getByTestId("last_name")).toHaveValue("preslaw");

    expect(
      screen.queryByText("Last name must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    expect(
      screen.queryByText("Username must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    expect(
      screen.queryByText(
        "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
      ),
    ).not.toBeInTheDocument();

    await user.type(screen.getByTestId("confirm_password"), "12345678Bg@");

    expect(screen.getByTestId("confirm_password")).toHaveValue("12345678Bg@");

    expect(screen.queryByText("Password must match")).not.toBeInTheDocument();
  });

  it("should navigate to login form when link is clicked", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup", "/login"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    // screen.debug();

    const user = userEvent.setup();

    await user.click(screen.getByText("Log In"));

    // screen.debug();

    expect(screen.getByText("Wemessage").textContent).toMatch(/wemessage/i);

    expect(screen.queryByText("Log in").textContent).toMatch(/log in/i);

    expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

    expect(
      screen.queryByText("Username is required to log in").textContent,
    ).toMatch(/username is required to log in/i);

    expect(screen.queryByText("Password:").textContent).toMatch(/password:/i);

    expect(
      screen.queryByText("Password is required to log in").textContent,
    ).toMatch(/password is required to log in/i);

    expect(screen.queryByText("Don't have an account?").textContent).toMatch(
      /don't have an account?/i,
    );

    expect(screen.queryByText("Sign Up").textContent).toMatch(/sign up/i);

    expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

    expect(screen.queryAllByRole("button")[1], { name: "Submit" });
  });

  it("should register and render the user information", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    expect(screen.queryByText("First name:").textContent).toMatch(
      /first name:/i,
    );

    await user.type(screen.getByTestId("first_name"), "test_user");

    expect(screen.getByTestId("first_name").value).toBe("test_user");

    expect(
      screen.queryByText("First name must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

    await user.type(screen.getByTestId("last_name"), "test_user");

    expect(screen.getByTestId("last_name")).toHaveValue("test_user");

    expect(
      screen.queryByText("Last name must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

    await user.type(screen.getByTestId("username"), "test_user");

    expect(screen.getByTestId("username")).toHaveValue("test_user");

    expect(
      screen.queryByText("Username must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Password:").textContent).toMatch(/password:/i);

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    expect(
      screen.queryByText(
        "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
      ),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Confirm Password:").textContent).toMatch(
      /confirm password:/i,
    );

    await user.type(screen.getByTestId("confirm_password"), "12345678Bg@");

    expect(screen.getByTestId("confirm_password")).toHaveValue("12345678Bg@");

    const signUpBtn = screen.queryByRole("button", { name: "Submit" });

    await user.click(signUpBtn);
  });

  it("should render span errors if the first, last name and username are taken", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    server.use(
      http.post("http://localhost:5000/users/signup", () => {
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

    expect(screen.queryByText("First name:").textContent).toMatch(
      /first name:/i,
    );

    await user.type(screen.getByTestId("first_name"), "preslaw");

    expect(screen.getByTestId("first_name").value).toBe("preslaw");

    expect(
      screen.queryByText("First name must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

    await user.type(screen.getByTestId("last_name"), "preslaw");

    expect(screen.getByTestId("last_name")).toHaveValue("preslaw");

    expect(
      screen.queryByText("Last name must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    expect(
      screen.queryByText("Username must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Password:").textContent).toMatch(/password:/i);

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    expect(
      screen.queryByText(
        "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
      ),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Confirm Password:").textContent).toMatch(
      /confirm password:/i,
    );

    await user.type(screen.getByTestId("confirm_password"), "12345678Bg@");

    expect(screen.getByTestId("confirm_password")).toHaveValue("12345678Bg@");

    const signUpBtn = screen.queryByRole("button", { name: "Submit" });

    await user.click(signUpBtn);

    // screen.debug();

    const firstNameErr = await screen.findByText("First name is already taken");

    expect(firstNameErr).toBeInTheDocument();

    const lastNameErr = await screen.findByText("Last name is already taken");

    expect(lastNameErr).toBeInTheDocument();

    const usernameErr = await screen.findByText("Username is already taken");

    expect(usernameErr).toBeInTheDocument();
  });
});
