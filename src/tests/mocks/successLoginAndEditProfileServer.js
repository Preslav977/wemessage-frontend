import { setupServer } from "msw/node";
import { successLoginAndEditProfileHandler } from "./successLoginAndEditProfileHandler";

export const successLoginAndEditProfileServer = setupServer(
  ...successLoginAndEditProfileHandler,
);
