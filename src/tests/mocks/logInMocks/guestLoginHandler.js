import { http, HttpResponse } from "msw";

export const guestLoginHandler = [
  http.post("http://localhost/users/login_guest", () => {
    return HttpResponse.json(
      {
        id: 5,
        username: "preslaw1",
        password: "12345678Bg@@",
      },
      { status: 200 },
    );
  }),
];
