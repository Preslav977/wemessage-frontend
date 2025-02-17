import { http, HttpResponse } from "msw";

export const successEditProfileHandler = [
  http.post("http://localhost:5000/users/login", () => {
    return HttpResponse.json(
      {
        username: "preslaw1",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
  http.put("http://localhost:5000/users/profile/edit/4", (req, res, ctx) => {
    return HttpResponse.json({
      first_name: "preslaw-edited",
      last_name: "preslaw-edited",
      username: "preslaw-edited",
      bio: "bio-edited",
    });
  }),
];
