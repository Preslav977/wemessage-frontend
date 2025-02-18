import { setupServer } from "msw/node";
import { handlers as signUpHandler200 } from "../handlers/signUpHandler200";
import { afterAll, afterEach, beforeAll } from "vitest";

export const server = setupServer(...signUpHandler200);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
