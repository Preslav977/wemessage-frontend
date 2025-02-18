import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/users/signup", () => {
    return new HttpResponse.json([
      { first_name: "test_user" },
      { last_name: "test_user" },
      { username: "test_user" },
      { password: "12345678" },
      { confirm_password: "12345678" },

      { status: 200 },
    ]);
  }),
];
