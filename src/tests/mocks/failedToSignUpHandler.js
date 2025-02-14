import { http, HttpResponse } from "msw";

export const failedToSignUpHandler = [
  http.post("http://localhost:5000/users/signup", (req, res, ctx) => {
    return res.json(
      ctx.status(400),
      ctx.json([
        { msg: "First name is already taken" },
        { msg: "Last name is already taken" },
        { msg: "Username is already taken" },
      ]),
    );
  }),
];
