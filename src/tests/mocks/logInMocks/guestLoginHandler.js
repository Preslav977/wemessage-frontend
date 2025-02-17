import { http, HttpResponse } from "msw";

export const guestLoginHandler = [
  http.post("http://localhost:5000/users/login_guest", () => {
    return HttpResponse.json(
      {
        id: 5,
        username: "preslaw-edited",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
];
