import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:5000/users/signup", () => {
    return HttpResponse.json(
      {
        id: 4,
        first_name: "preslaw",
        last_name: "preslaw",
        username: "preslaw",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
        bio: "",
      },
      { status: 200 },
    );
  }),
  http.post("http://localhost:5000/users/login_guest", () => {
    return HttpResponse.json(
      {
        id: 4,
        username: "preslaw",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),

  http.post("http://localhost:5000/users/login", () => {
    return HttpResponse.json(
      {
        id: 4,
        username: "preslaw",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),

  http.put("http://localhost:5000/users/profile/edit/4", () => {
    return HttpResponse.json(
      {
        id: 4,
        first_name: "preslaw123",
        last_name: "preslaw123",
        username: "preslaw123",
        password: "12345678Bg@@",
        confirm_password: "12345678Bg@@",
        bio: "bio123",
      },
      { status: 200 },
    );
  }),
];
