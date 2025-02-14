import { setupServer } from "msw/node";
import { failedEditProfileHandler } from "./failedEditProfileHandler";

export const failedEditProfileServer = setupServer(...failedEditProfileHandler);
