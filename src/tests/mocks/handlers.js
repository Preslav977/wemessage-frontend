import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:5000/users/signup", () => {
    return HttpResponse.json(
      {
        first_name: "test_user",
        last_name: "test_user",
        username: "test_user",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
  http.post("http://localhost:5000/users/login_guest", () => {
    return HttpResponse.json(
      {
        username: "test_user",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
  http.post("http://localhost:5000/users/login", () => {
    return HttpResponse.json(
      {
        username: "test",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),
  // http.get("http://localhost:5000/users", () => {
  //   return HttpResponse.json(
  //     {
  //       first_name: "test",
  //       last_name: "test",
  //       username: "test",
  //       password: "12345678Bg@",
  //       confirm_password: "12345678Bg@",
  //     },
  //     { status: 200 },
  //   );
  // }),
  http.put("http://localhost/users/profile/edit/20", () => {
    return HttpResponse.json(
      {
        first_name: "test_user1",
        last_name: "test_user1",
        username: "test_user1",
        bio: "bio1",
      },
      { status: 200 },
    );
  }),
];
