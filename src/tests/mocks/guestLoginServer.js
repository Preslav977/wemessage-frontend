import { setupServer } from "msw/node";
import { guestLoginHandler } from "./guestLoginHandler";

export const guestLoginServer = setupServer(...guestLoginHandler);
