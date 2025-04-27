import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { server } from "./mocks/node/server";
import { http, HttpResponse } from "msw";
import { beforeAll, afterEach, afterAll } from "vitest";
import localhostURL from "../utility/localhostURL";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("should render LogInForm", () => {
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

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

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

    server.use(
      http.get(`${localhostURL}/users`, async ({ request }) => {
        const result = await request.json(
          {
            id: 1,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
            password: "12345678Bg@",
          },
          { status: 200 },
        );

        return HttpResponse.json(result, { status: 200 });
      }),
    );

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

    expect(screen.queryAllByRole("button")[1], { name: "Submit" });

    const guestLogInBtn = screen.queryAllByRole("button");

    await user.click(guestLogInBtn[0]);

    screen.debug();

    expect(
      screen.queryByText("Username is required to log in"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Password is required to log in"),
    ).toBeInTheDocument();

    screen.debug();

    expect(screen.queryByAltText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));
    // screen.debug();

    expect(
      screen.queryByRole("button", { name: "Guest Login" }),
    ).not.toBeInTheDocument();
  });

  it("should render loading spinner when users logs in", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId("username"), "preslaw");

    expect(screen.getByTestId("username")).toHaveValue("preslaw");

    await user.type(screen.getByTestId("password"), "12345678Bg@");

    expect(screen.getByTestId("password")).toHaveValue("12345678Bg@");

    expect(
      screen.queryByText("Username is required to log in"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Password is required to log in"),
    ).not.toBeInTheDocument();

    expect(screen.queryAllByRole("button")[0], { name: "Guest Login" });

    expect(screen.queryAllByRole("button")[1], { name: "Submit" });

    const submitBtn = screen.queryAllByRole("button");

    screen.debug();

    await user.click(submitBtn[1]);

    // screen.debug();

    const loadingBtn = screen.queryByText("Loading...");

    expect(loadingBtn).toBeInTheDocument();

    // screen.debug();

    expect(
      screen.queryByRole("button", { name: "Guest Login" }),
    ).not.toBeInTheDocument();
  });

  it("should render a modal when used wrong credentials", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    server.use(
      http.post(`${localhostURL}/users/login`, async () => {
        return HttpResponse.json(
          { msg: "Wrong username or password" },
          {
            status: 401,
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

    screen.debug();

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

    // await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    // screen.debug();

    // expect(screen.queryByAltText("Loading..."));

    // await waitForElementToBeRemoved(() => screen.queryByAltText("Loading..."));

    screen.debug();

    const unauthorizedErr = await screen.findByText(
      "Wrong username or password",
    );

    expect(unauthorizedErr).toBeInTheDocument();

    const unauthorizedPopModalErr =
      await screen.findByText("Wrong credentials");

    expect(unauthorizedPopModalErr).toBeInTheDocument();
  });

  it("should redirect and render to sign up form when anchor link clicked", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/signup"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

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

    await user.click(screen.queryByText("Sign Up"));

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
});
