import { setupServer } from "msw/node";
import { handlers as signUpHandler200 } from "../handlers/signUpHandler200";

export const server = setupServer(...signUpHandler200);
