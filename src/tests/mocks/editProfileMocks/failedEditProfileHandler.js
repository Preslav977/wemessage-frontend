import { http, HttpResponse } from "msw";

export const failedEditProfileHandler = [
  http.post("http://localhost:5000/users/login", () => {
    return HttpResponse.json(
      {
        username: "preslaw",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
  http.put("http://localhost:5000/users/profile/edit/4", (req, res, ctx) => {
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
