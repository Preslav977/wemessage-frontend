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

  http.put("http://localhost:5000/users/profile/background_image/4", () => {
    const form = new FormData();

    const bgImageFile = new File(["image"], "image.png", { type: "image/png" });

    form.set("file", bgImageFile, "image/png");

    console.log(form);

    fetch("http://localhost:5000/users/profile/background_image/4", {
      method: "PUT",
      body: form,
    });
  }),

  http.put("http://localhost:5000/users/profile/image/4", () => {
    const form = new FormData();

    const bgImageFile = new File(["image"], "image.png", { type: "image/png" });

    form.set("file", bgImageFile, "image/png");

    console.log(form);

    fetch("http://localhost:5000/users/profile/background_image/4", {
      method: "PUT",
      body: form,
    });
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

  http.put("http://localhost:5000/users/profile/change_passwords/4", () => {
    return HttpResponse.json(
      {
        id: 4,
        old_password: "12345678Bg@@",
        password: "12345678Bg@@",
        confirm_password: "12345678Bg@@",
      },
      { status: 200 },
    );
  }),
];
