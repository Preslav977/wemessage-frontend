import { setupServer } from "msw/node";
import { loginPostHandler } from "./loginPostHandler";

export const server = setupServer(...loginPostHandler);
