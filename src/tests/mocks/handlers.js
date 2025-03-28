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

  http.get("http://localhost:5000/chats", () => {
    return HttpResponse.json([
      // {
      //   id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
      //   senderChatId: 2,
      //   receiverChatId: 1,
      //   senderChat: {
      //     id: 2,
      //     first_name: "preslaw1",
      //     last_name: "preslaw1",
      //     username: "preslaw1",
      //     password:
      //       "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
      //     confirm_password:
      //       "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
      //     bio: "",
      //     profile_picture: "",
      //     background_picture:
      //       "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
      //     online_presence: "ONLINE",
      //     role: "USER",
      //     groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
      //     globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
      //   },
      //   receiverChat: {
      //     id: 1,
      //     first_name: "preslaw",
      //     last_name: "preslaw",
      //     username: "preslaw",
      //     password:
      //       "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
      //     confirm_password:
      //       "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
      //     bio: "",
      //     profile_picture: "",
      //     background_picture: "",
      //     online_presence: "ONLINE",
      //     role: "USER",
      //     groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
      //     globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
      //   },
      //   messages: [
      //     // {
      //     //   id: 1,
      //     //   message_text: "hello",
      //     //   message_imageName: "",
      //     //   message_imageURL: "",
      //     //   message_imageType: "",
      //     //   message_imageSize: 0,
      //     //   createdAt: "2025-03-24T10:42:22.213Z",
      //     //   updatedAt: "2025-03-24T10:42:22.216Z",
      //     //   senderMessageId: 2,
      //     //   receiverMessageId: 1,
      //     //   chatId: "73cc246e-897e-412f-8ab8-6fb4c29db485",
      //     // },
      //     // {
      //     //   id: 2,
      //     //   message_text: "hello",
      //     //   message_imageName: "",
      //     //   message_imageURL: "",
      //     //   message_imageType: "",
      //     //   message_imageSize: 0,
      //     //   createdAt: "2025-03-24T10:43:30.778Z",
      //     //   updatedAt: "2025-03-24T10:43:30.779Z",
      //     //   senderMessageId: 2,
      //     //   receiverMessageId: 1,
      //     //   chatId: "73cc246e-897e-412f-8ab8-6fb4c29db485",
      //     // },
      //   ],
      // },
    ]);
  }),

  // http.get(
  //   "http://localhost:5000/chats/73cc246e-897e-412f-8ab8-6fb4c29db485",
  //   () => {
  //     return HttpResponse.json([
  //       {
  //         id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
  //         senderChatId: 2,
  //         receiverChatId: 1,
  //         senderChat: {
  //           id: 2,
  //           first_name: "preslaw1",
  //           last_name: "preslaw1",
  //           username: "preslaw1",
  //           password:
  //             "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
  //           confirm_password:
  //             "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
  //           bio: "",
  //           profile_picture: "",
  //           background_picture:
  //             "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
  //           online_presence: "ONLINE",
  //           role: "USER",
  //           groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
  //           globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
  //         },
  //         receiverChat: {
  //           id: 1,
  //           first_name: "preslaw",
  //           last_name: "preslaw",
  //           username: "preslaw",
  //           password:
  //             "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
  //           confirm_password:
  //             "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
  //           bio: "",
  //           profile_picture: "",
  //           background_picture: "",
  //           online_presence: "ONLINE",
  //           role: "USER",
  //           groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
  //           globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
  //         },
  //         messages: [
  //           // {
  //           //   id: 1,
  //           //   message_text: "hello",
  //           //   message_imageName: "",
  //           //   message_imageURL: "",
  //           //   message_imageType: "",
  //           //   message_imageSize: 0,
  //           //   createdAt: "2025-03-24T10:42:22.213Z",
  //           //   updatedAt: "2025-03-24T10:42:22.216Z",
  //           //   senderMessageId: 2,
  //           //   receiverMessageId: 1,
  //           //   chatId: "73cc246e-897e-412f-8ab8-6fb4c29db485",
  //           // },
  //           // {
  //           //   id: 2,
  //           //   message_text: "hello",
  //           //   message_imageName: "",
  //           //   message_imageURL: "",
  //           //   message_imageType: "",
  //           //   message_imageSize: 0,
  //           //   createdAt: "2025-03-24T10:43:30.778Z",
  //           //   updatedAt: "2025-03-24T10:43:30.779Z",
  //           //   senderMessageId: 2,
  //           //   receiverMessageId: 1,
  //           //   chatId: "73cc246e-897e-412f-8ab8-6fb4c29db485",
  //           // },
  //         ],
  //       },
  //     ]);
  //   },
  // ),
];
