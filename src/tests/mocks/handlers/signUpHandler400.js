import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:5000/users/signup", () => {
    return HttpResponse.json(
      [
        { msg: "First name is already taken" },
        { msg: "Last name is already taken" },
        { msg: "Username is already taken" },
      ],
      {
        status: 400,
      },
    );
  }),
];
