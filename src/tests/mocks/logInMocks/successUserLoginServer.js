import { setupServer } from "msw/node";
import { successUserLoginHandler } from "./successUserLoginHandler";

export const successUserLoginServer = setupServer(...successUserLoginHandler);
