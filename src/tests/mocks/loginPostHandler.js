import { http, HttpResponse } from "msw";

export const loginPostHandler = [
  http.post("http://localhost:5000/users/login", (req, res, ctx) => {
    return HttpResponse.json(
      {
        // id: 4,
        username: "preslaw",
        password: "12345678Bg",
      },
      { status: 401 },
    );
  }),
  // http.get("http://localhost:5000/users", (req, res, ctx) => {
  //   return HttpResponse.json({
  //     id: 4,
  //     first_name: "preslaw",
  //     last_name: "preslaw",
  //     username: "preslaw",
  //     password: "12345678Bg@",
  //     confirm_password: "12345678Bg@",
  //     bio: "test",
  //     profile_picture:
  //       "https://res.cloudinary.com/dsofl9wku/image/upload/v1738753076/wemessage_images/no_profile_picture.jpg.jpg",
  //     background_picture:
  //       "https://res.cloudinary.com/dsofl9wku/image/upload/v1738753076/wemessage_images/no_profile_picture.jpg.jpg",
  //     online_presence: "ONLINE",
  //     role: "USER",
  //   });
  // }),
];
