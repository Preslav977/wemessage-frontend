import { http } from "msw";

export const failedUserLoginHandler = [
  http.post("http://localhost/users/login", (req, res, ctx) => {
    return res.json(
      ctx.status(401),
      ctx.json({ msg: "Wrong username or password" }),
    );
  }),
];
