import { render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { server } from "./mocks/node";
import { loginPostHandler } from "./mocks/loginPostHandler";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("should render LogInForm", () => {
  // it("should render the content of this component", () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login"],
  //   });

  //   render(<RouterProvider router={router} />);

  //   // screen.debug();

  //   expect(screen.getByText("Wemessage").textContent).toMatch(/wemessage/i);

  //   expect(screen.queryByText("Log in").textContent).toMatch(/log in/i);

  //   expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

  //   expect(
  //     screen.queryByText("Username is required to log in").textContent,
  //   ).toMatch(/username is required to log in/i);

  //   expect(screen.queryByText("Password:").textContent).toMatch(/password:/i);

  //   expect(
  //     screen.queryByText("Password is required to log in").textContent,
  //   ).toMatch(/password is required to log in/i);

  //   expect(screen.queryByText("Don't have an account?").textContent).toMatch(
  //     /don't have an account?/i,
  //   );

  //   expect(screen.queryByText("Sign Up").textContent).toMatch(/sign up/i);

  //   expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

  //   expect(screen.queryAllByRole("button")[1], { name: "Submit" });
  // });

  // it("should hide span errors when user types", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login"],
  //   });

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByRole("username"), "preslaw");

  //   expect(screen.getByRole("username")).toHaveValue("preslaw");

  //   await user.type(screen.getByRole("password"), "12345678Bg@");

  //   expect(screen.getByRole("password")).toHaveValue("12345678Bg@");

  //   expect(
  //     screen.queryByText("Username is required to log in"),
  //   ).not.toBeInTheDocument();

  //   expect(
  //     screen.queryByText("Password is required to log in"),
  //   ).not.toBeInTheDocument();

  //   expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

  //   expect(screen.queryAllByRole("button")[1], { name: "Submit" });
  // });

  // it("should render loading spinner when guest login button is clicked", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login"],
  //   });

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

  //   expect(screen.queryAllByRole("button")[1], { name: "Submit" });

  //   const guestLogInBtn = screen.queryAllByRole("button");

  //   await user.click(guestLogInBtn[0]);

  //   expect(
  //     screen.queryByText("Username is required to log in"),
  //   ).toBeInTheDocument();

  //   expect(
  //     screen.queryByText("Password is required to log in"),
  //   ).toBeInTheDocument();

  //   const loadingBtn = await screen.findByTestId("loading-btn");

  //   expect(loadingBtn).toBeInTheDocument();

  //   // screen.debug();

  //   expect(
  //     screen.queryByRole("button", { name: "Guest Login" }),
  //   ).not.toBeInTheDocument();
  // });

  // it("should render loading spinner when users logs in", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login"],
  //   });

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   await user.type(screen.getByRole("username"), "preslaw");

  //   expect(screen.getByRole("username")).toHaveValue("preslaw");

  //   await user.type(screen.getByRole("password"), "12345678Bg@");

  //   expect(screen.getByRole("password")).toHaveValue("12345678Bg@");

  //   expect(
  //     screen.queryByText("Username is required to log in"),
  //   ).not.toBeInTheDocument();

  //   expect(
  //     screen.queryByText("Password is required to log in"),
  //   ).not.toBeInTheDocument();

  //   expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

  //   expect(screen.queryAllByRole("button")[1], { name: "Submit" });

  //   const submitBtn = screen.queryAllByRole("button");

  //   await user.click(submitBtn[0]);

  //   const loadingBtn = await screen.findByTestId("loading-btn");

  //   expect(loadingBtn).toBeInTheDocument();

  //   // screen.debug();

  //   expect(
  //     screen.queryByRole("button", { name: "Guest Login" }),
  //   ).not.toBeInTheDocument();
  // });

  it("should render a modal when used wrong credentials", async () => {
    // server.use(
    //   http.post("http://localhost/users/login", (req, res, ctx) => {
    //     return new HttpResponse(
    //       { id: 4, username: "preslaw", password: "12345678Bg" },
    //       { status: 403 },
    //     );
    //   }),
    // );

    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });
    render(<RouterProvider router={router} />);

    server.use(...loginPostHandler);

    const user = userEvent.setup();

    await user.type(screen.getByRole("username"), "preslaw");

    expect(screen.getByRole("username")).toHaveValue("preslaw");

    await user.type(screen.getByRole("password"), "12345678Bg");

    expect(screen.getByRole("password")).toHaveValue("12345678Bg");

    expect(
      screen.queryByText("Username is required to log in"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password is required to log in"),
    ).not.toBeInTheDocument();

    expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

    expect(screen.queryAllByRole("button")[1], { name: "Submit" });

    const submitBtn = screen.queryAllByRole("button");

    await user.click(submitBtn[1]);

    screen.debug();

    // await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    const modal = await screen.findByTestId("modal");

    expect(modal).toBeInTheDocument();
  });

  // it("should redirect and render to sign up form when anchor link clicked", async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/login", "/signup"],
  //     initialIndex: 0,
  //   });

  //   render(<RouterProvider router={router} />);

  //   const user = userEvent.setup();

  //   expect(screen.getByText("Wemessage").textContent).toMatch(/wemessage/i);

  //   expect(screen.queryByText("Log in").textContent).toMatch(/log in/i);

  //   expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

  //   expect(
  //     screen.queryByText("Username is required to log in").textContent,
  //   ).toMatch(/username is required to log in/i);

  //   expect(screen.queryByText("Password:").textContent).toMatch(/password:/i);

  //   expect(
  //     screen.queryByText("Password is required to log in").textContent,
  //   ).toMatch(/password is required to log in/i);

  //   expect(screen.queryByText("Don't have an account?").textContent).toMatch(
  //     /don't have an account?/i,
  //   );

  //   expect(screen.queryByText("Sign Up").textContent).toMatch(/sign up/i);

  //   expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

  //   expect(screen.queryAllByRole("button")[1], { name: "Submit" });

  //   await user.click(screen.queryByText("Sign Up"));

  //   // screen.debug();

  //   expect(screen.queryByText("Wemessage").textContent).toMatch(/wemessage/i);

  //   expect(screen.queryByRole("h1"), { name: "Sign up" });

  //   expect(screen.queryByText("First name:").textContent).toMatch(
  //     /first name:/i,
  //   );

  //   expect(
  //     screen.queryByText("First name must be between 1 and 30 characters")
  //       .textContent,
  //   ).toMatch(/first name must be between 1 and 30 characters/i);

  //   expect(
  //     screen.queryByText("Last name must be between 1 and 30 characters")
  //       .textContent,
  //   ).toMatch(/last name must be between 1 and 30 characters/i);

  //   expect(
  //     screen.queryByText("Username must be between 1 and 30 characters")
  //       .textContent,
  //   ).toMatch(/username must be between 1 and 30 characters/i);

  //   expect(
  //     screen.queryByText(
  //       "Password must be 8 characters long, and contain one lower, one uppercase and one special character",
  //     ).textContent,
  //   ).toMatch(
  //     /password must be 8 characters long, and contain one lower, one uppercase and one special character/i,
  //   );

  //   expect(screen.queryByText("Last name:").textContent).toMatch(/last name:/i);

  //   expect(screen.queryByText("Username:").textContent).toMatch(/username:/i);

  //   expect(screen.queryByText("Password:").textContent).toMatch(/password:/i);

  //   expect(screen.queryByText("Confirm Password:").textContent).toMatch(
  //     /confirm password:/i,
  //   );

  //   expect(screen.queryByText("Already have an account?").textContent).toMatch(
  //     /already have an account?/i,
  //   );

  //   expect(screen.queryByText("Log In").textContent).toMatch(/log in/i);

  //   expect(screen.queryByRole("button"), { name: "Submit" });
  // });
});
