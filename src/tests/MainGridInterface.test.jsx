import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../router/routes";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

describe("should render MainGridInterface", () => {
  it("should render Login form then navigate to user profile", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/5"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByRole("username"), "preslaw");

    expect(screen.getByRole("username")).toHaveValue("preslaw");

    await user.type(screen.getByRole("password"), "12345678Bg@");

    expect(screen.getByRole("password")).toHaveValue("12345678Bg@");

    const submitBtn = screen.queryAllByRole("button");

    // screen.debug();

    await user.click(submitBtn[1]);

    const loadingBtn = await screen.findByTestId("loading-btn");

    expect(loadingBtn).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

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

    expect(screen.queryByRole("button", { name: "Save" })).toBeInTheDocument();

    expect(screen.queryByText("preslaw preslaw").textContent).toMatch(
      /preslaw preslaw/i,
    );

    expect(screen.queryByText("@preslaw").textContent).toMatch(/@preslaw/);

    expect(screen.queryByTestId("user_presence")).toBeInTheDocument();

    expect(screen.queryAllByText("Edit Profile")[1].textContent).toMatch(
      /edit profile/i,
    );
  });
});
