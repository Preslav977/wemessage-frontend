import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import PopUpModal from "../components/PopUpModal/PopUpModal";

describe("should render PopUpModal", () => {
  it("should render the content of this component", () => {
    const routes = [
      {
        path: "/",
        element: <PopUpModal popUpModalContentText={"Wrong Credentials"} />,
      },
    ];

    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    expect(screen.queryByText("Wrong Credentials").textContent).toMatch(
      /wrong credentials/i,
    );
  });
});
