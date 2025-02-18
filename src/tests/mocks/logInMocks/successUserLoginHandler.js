import { http, HttpResponse } from "msw";

export const successUserLoginHandler = [
  http.post("http://localhost/users/login", () => {
    return HttpResponse.json(
      {
        username: "preslaw",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
];
