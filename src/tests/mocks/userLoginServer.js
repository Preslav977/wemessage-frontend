import { setupServer } from "msw/node";
import { userLoginHandler } from "./userLoginHandler";

export const userLoginServer = setupServer(...userLoginHandler);
