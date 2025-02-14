import { setupServer } from "msw/node";
import { failedToSignUpHandler } from "./failedToSignUpHandler";

export const failedToSignUpServer = setupServer(...failedToSignUpHandler);
