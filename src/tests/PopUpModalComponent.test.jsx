import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import PopUpModalComponent from "../components/PopUpModalComponent";

describe("should render PopUpModalComponent", () => {
  it("should render the content of this component", () => {
    const routes = [
      {
        path: "/",
        element: (
          <PopUpModalComponent popUpModalContentText={"Wrong Credentials"} />
        ),
      },
    ];

    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    expect(screen.queryByText("Wrong Credentials").textContent).toMatch(
      /wrong credentials/i,
    );
  });
});
