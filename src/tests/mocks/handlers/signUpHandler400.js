import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/users/signup", () => {
    return new HttpResponse.json([
      { msg: "First name is already taken" },
      { msg: "Last name is already taken" },
      { msg: "Username is already taken" },
      { status: 400 },
    ]);
  }),
];
