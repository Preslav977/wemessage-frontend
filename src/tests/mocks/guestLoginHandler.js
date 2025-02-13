import { http, HttpResponse } from "msw";

export const guestLoginHandler = [
  http.post("http://localhost:5000/users/login", () => {
    return HttpResponse.json(
      {
        username: "preslaw1",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
];
