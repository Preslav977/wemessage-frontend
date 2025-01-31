import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

describe("should render SignUpFormComponent", () => {
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

    await user.type(screen.getByRole("first_name"), "preslaw");

    expect(screen.getByRole("first_name")).toHaveValue("preslaw");

    expect(
      screen.queryByText("First name must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.getByRole("last_name"), "preslaw");

    expect(screen.getByRole("last_name")).toHaveValue("preslaw");

    expect(
      screen.queryByText("Last name must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.getByRole("username"), "preslaw");

    expect(screen.getByRole("username")).toHaveValue("preslaw");

    expect(
      screen.queryByText("Username must be between 1 and 30 characters"),
    ).not.toBeInTheDocument();

    await user.type(screen.getByRole("password"), "12345678Bg@");

    expect(screen.getByRole("password")).toHaveValue("12345678Bg@");

    expect(
      screen.queryByText(
        "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
      ),
    ).not.toBeInTheDocument();

    await user.type(screen.getByRole("confirm_password"), "12345678Bg@");

    expect(screen.getByRole("confirm_password")).toHaveValue("12345678Bg@");

    expect(screen.queryByText("Password must match")).not.toBeInTheDocument();
  });

  it("should navigate to login form when link is clicked", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup", "/login"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    screen.debug();

    const user = userEvent.setup();

    await user.click(screen.getByText("Log In"));

    screen.debug();

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
});
