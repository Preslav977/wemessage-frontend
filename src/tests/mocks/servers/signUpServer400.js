import { setupServer } from "msw/node";
import { handlers as signUpHandler } from "../handlers/signUpHandler400.js";

export const server = setupServer(...signUpHandler);
