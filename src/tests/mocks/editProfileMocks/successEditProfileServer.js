import { setupServer } from "msw/node";
import { successEditProfileHandler } from "./successEditProfileHandler";

export const successEditProfileServer = setupServer(
  ...successEditProfileHandler,
);
