import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

describe("should render LogInFormComponent", () => {
  it("should render the content of this component", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

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
