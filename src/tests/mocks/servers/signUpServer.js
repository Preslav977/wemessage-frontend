import { setupServer } from "msw/node";
import { handlers as signUpHandler } from "../handlers/signUpHandler.js";

export const server = setupServer(...signUpHandler);
