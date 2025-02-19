import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:5000/users/signup", () => {
    return HttpResponse.json({
      first_name: "test_user",
      last_name: "test_user",
      username: "test_user",
      password: "12345678Bg@",
      confirm_password: "12345678Bg@",
    });
  }),

  // http.post("http://localhost:5000/users/signup", () => {
  //   return HttpResponse.json(
  //     [
  //       { msg: "First name is already taken" },
  //       { msg: "Last name is already taken" },
  //       { msg: "Username is already taken" },
  //     ],
  //     {
  //       status: 400,
  //     },
  //   );
  // }),
];
