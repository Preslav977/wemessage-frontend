import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import UserProfile from "../components/UserProfile/UserProfile";
import routes from "../router/routes";

describe("should render UserProfile", () => {
  it("should render the content of this component", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/profile/1"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    screen.debug();
  });
});
