import { http, HttpResponse } from "msw";

export const successEditProfileHandler = [
  http.post("http://localhost/users/login", () => {
    return HttpResponse.json(
      {
        username: "preslawp",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
  http.put("http://localhost/users/profile/edit/4", (req, res, ctx) => {
    return HttpResponse.json({
      first_name: "preslawp",
      last_name: "preslawp",
      username: "preslawp",
      bio: "bio",
    });
  }),
];
