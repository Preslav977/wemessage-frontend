import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

describe("should render SignUpFormComponent", () => {
  it("should render the content of this component", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    screen.debug();

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
});
