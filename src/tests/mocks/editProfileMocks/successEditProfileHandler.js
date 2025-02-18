import { http, HttpResponse } from "msw";

export const successEditProfileHandler = [
  http.post("http://localhost/users/login", () => {
    return HttpResponse.json(
      {
        username: "test",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
  http.put("http://localhost/users/profile/edit/9", (req, res, ctx) => {
    return HttpResponse.json({
      first_name: "testt",
      last_name: "testt",
      username: "testt",
      bio: "bio",
    });
  }),
];
