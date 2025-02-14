import { setupServer } from "msw/node";
import { failedUserLoginHandler } from "./failedUserLoginHandler";

export const failedUserLoginServer = setupServer(...failedUserLoginHandler);
