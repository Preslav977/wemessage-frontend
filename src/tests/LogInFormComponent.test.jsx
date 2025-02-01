import {
  findByTestId,
  findByText,
  getByRole,
  getByTestId,
  getByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { vi } from "vitest";

describe("should render LogInFormComponent", () => {
  it("should render the content of this component", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

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

  it("should hide span errors when user types", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByRole("username"), "preslaw");

    expect(screen.getByRole("username")).toHaveValue("preslaw");

    await user.type(screen.getByRole("password"), "12345678Bg@");

    expect(screen.getByRole("password")).toHaveValue("12345678Bg@");

    expect(
      screen.queryByText("Username is required to log in"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Password is required to log in"),
    ).not.toBeInTheDocument();

    expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

    expect(screen.queryAllByRole("button")[1], { name: "Submit" });
  });

  it("should render loading spinner when guest login button is clicked", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

    expect(screen.queryAllByRole("button")[1], { name: "Submit" });

    const guestLogInBtn = screen.queryAllByRole("button");

    await user.click(guestLogInBtn[0]);

    expect(
      screen.queryByText("Username is required to log in"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Password is required to log in"),
    ).not.toBeInTheDocument();

    const loadingBtn = await screen.findByTestId("loading-btn");

    expect(loadingBtn).toBeInTheDocument();

    screen.debug();

    // screen.debug();
  });
});
