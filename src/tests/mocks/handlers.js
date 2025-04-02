import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:5000/users/signup", async () => {
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

  http.post("http://localhost:5000/users/login_guest", async () => {
    return HttpResponse.json(
      {
        id: 4,
        username: "preslaw",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),

  http.post("http://localhost:5000/users/login", async () => {
    return HttpResponse.json(
      {
        id: 4,
        username: "preslaw",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),

  http.put(
    "http://localhost:5000/users/profile/background_image/4",
    async () => {
      const form = new FormData();

      const bgImageFile = new File(["image"], "image.png", {
        type: "image/png",
      });

      form.set("file", bgImageFile, "image/png");

      fetch("http://localhost:5000/users/profile/background_image/4", {
        method: "PUT",
        body: form,
      });
    },
  ),

  http.put("http://localhost:5000/users/profile/image/4", async () => {
    const form = new FormData();

    const bgImageFile = new File(["image"], "image.png", { type: "image/png" });

    form.set("file", bgImageFile, "image/png");

    console.log(form);

    fetch("http://localhost:5000/users/profile/background_image/4", {
      method: "PUT",
      body: form,
    });
  }),

  http.put("http://localhost:5000/users/profile/edit/4", async () => {
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

  http.put(
    "http://localhost:5000/users/profile/change_passwords/4",
    async () => {
      return HttpResponse.json(
        {
          id: 4,
          old_password: "12345678Bg@@",
          password: "12345678Bg@@",
          confirm_password: "12345678Bg@@",
        },
        { status: 200 },
      );
    },
  ),

  http.get("http://localhost:5000/chats", async () => {
    return HttpResponse.json([
      {
        id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
        senderChatId: 4,
        receiverChatId: 5,
        senderChat: {
          id: 4,
          first_name: "preslaw",
          last_name: "preslaw",
          username: "preslaw",
          password:
            "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
          confirm_password:
            "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
          bio: "",
          profile_picture: "",
          background_picture:
            "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
          online_presence: "ONLINE",
          role: "USER",
          groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
          globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
        },
        receiverChat: {
          id: 5,
          first_name: "preslaw1",
          last_name: "preslaw1",
          username: "preslaw1",
          password:
            "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
          confirm_password:
            "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
          bio: "",
          profile_picture: "",
          background_picture: "",
          online_presence: "ONLINE",
          role: "USER",
          groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
          globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
        },
        messages: [],
      },
    ]);
  }),

  http.get("http://localhost:5000/users", async () => {
    return HttpResponse.json(
      {
        id: 4,
        first_name: "preslaw",
        last_name: "preslaw",
        username: "preslaw",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
        bio: "",
        profile_picture: "",
        background_picture: "",
      },
      { status: 200 },
    );
  }),

  http.get("http://localhost:5000/users/4", async () => {
    return HttpResponse.json(
      {
        id: 4,
        first_name: "preslaw",
        last_name: "preslaw",
        username: "preslaw",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
        bio: "",
        profile_picture: "",
        background_picture: "",
      },
      { status: 200 },
    );
  }),

  http.get("http://localhost:5000/users/all", async () => {
    return HttpResponse.json([
      {
        id: 4,
        first_name: "preslaw",
        last_name: "preslaw",
        username: "preslaw",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
        bio: "",
        profile_picture: "",
        background_picture: "",
      },
      {
        id: 5,
        first_name: "preslaw1",
        last_name: "preslaw1",
        username: "preslaw1",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",

        bio: "",
        profile_picture: "",
        background_picture: "",
      },
      {
        id: 6,
        first_name: "preslaw2",
        last_name: "preslaw2",
        username: "preslaw2",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
        bio: "",
        profile_picture: "",
        background_picture: "",
      },
      { status: 200 },
    ]);
  }),

  http.get("http://localhost:5000/users/search", async ({ request }) => {
    const url = new URL(request.url);

    const getUser = url.searchParams.get("query");

    if (!getUser) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json([
      {
        id: 5,
        first_name: "preslaw1",
        last_name: "preslaw1",
        username: "preslaw1",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
        bio: "",
        profile_picture: "",
        background_picture: "",
      },
    ]);
  }),

  http.get("http://localhost:5000/users/5", async () => {
    return HttpResponse.json(
      {
        id: 5,
        first_name: "preslaw1",
        last_name: "preslaw1",
        username: "preslaw1",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
        bio: "",
        profile_picture: "",
        background_picture: "",
      },
      { status: 200 },
    );
  }),

  http.post("http://localhost:5000/chats", async () => {
    return HttpResponse.json(
      {
        id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
        senderChatId: 4,
        receiverChatId: 5,
        senderChat: {
          id: 4,
          first_name: "preslaw",
          last_name: "preslaw",
          username: "preslaw",
          password: "12345678Bg@",
          confirm_password: "12345678Bg@",
          bio: "",
          profile_picture: "",
          background_picture:
            "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
          online_presence: "ONLINE",
          role: "USER",
          groupId: null,
          globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
        },
        receiverChat: {
          id: 5,
          first_name: "preslaw1",
          last_name: "preslaw1",
          username: "preslaw1",
          password: "12345678Bg@",
          confirm_password: "12345678Bg@",
          bio: "",
          profile_picture: "",
          background_picture:
            "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
          online_presence: "ONLINE",
          role: "USER",
          groupId: null,
          globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
        },
        messages: [],
      },
      { status: 200 },
    );
  }),

  http.get(
    "http://localhost:5000/chats/73cc246e-897e-412f-8ab8-6fb4c29db485",
    async () => {
      return HttpResponse.json(
        {
          id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
          senderChatId: 4,
          receiverChatId: 5,
          senderChat: {
            id: 4,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
            password:
              "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
            confirm_password:
              "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
            bio: "",
            profile_picture: "",
            background_picture:
              "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          receiverChat: {
            id: 5,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
            password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            confirm_password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            bio: "",
            profile_picture: "",
            background_picture: "",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          messages: [],
        },

        { status: 200 },
      );
    },
  ),

  http.post(
    "http://localhost:5000/chats/73cc246e-897e-412f-8ab8-6fb4c29db485/message",
    async () => {
      return HttpResponse.json(
        {
          id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
          senderChatId: 4,
          receiverChatId: 5,
          senderChat: {
            id: 4,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
            password:
              "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
            confirm_password:
              "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
            bio: "",
            profile_picture: "",
            background_picture:
              "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          receiverChat: {
            id: 5,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
            password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            confirm_password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            bio: "",
            profile_picture: "",
            background_picture: "",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          messages: [
            {
              id: 1,
              message_text: "hello!",
              message_imageName: "",
              message_imageURL: "",
              message_imageType: "",
              message_imageSize: 0,
              createdAt: "2025-03-24T10:42:22.213Z",
              updatedAt: "2025-03-24T10:42:22.216Z",
              senderMessageId: 4,
              receiverId: 5,
              chatId: "73cc246e-897e-412f-8ab8-6fb4c29db485",
            },
          ],
        },

        { status: 200 },
      );
    },
  ),

  http.put(
    "http://localhost:5000/chats/73cc246e-897e-412f-8ab8-6fb4c29db485/message/1",
    async () => {
      return HttpResponse.json(
        {
          id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
          senderChatId: 4,
          receiverChatId: 5,
          senderChat: {
            id: 4,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
            password:
              "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
            confirm_password:
              "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
            bio: "",
            profile_picture: "",
            background_picture:
              "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          receiverChat: {
            id: 5,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
            password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            confirm_password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            bio: "",
            profile_picture: "",
            background_picture: "",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          messages: [
            {
              id: 1,
              message_text: "edited message",
              message_imageName: "",
              message_imageURL: "",
              message_imageType: "",
              message_imageSize: 0,
              createdAt: "2025-03-24T10:42:22.213Z",
              updatedAt: "2025-03-24T10:42:22.216Z",
              senderMessageId: 4,
              receiverId: 5,
              chatId: "73cc246e-897e-412f-8ab8-6fb4c29db485",
            },
          ],
        },

        { status: 200 },
      );
    },
  ),

  http.delete(
    "http://localhost:5000/chats/73cc246e-897e-412f-8ab8-6fb4c29db485/message/1",
    async () => {
      return HttpResponse.json(
        {
          id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
          senderChatId: 4,
          receiverChatId: 5,
          senderChat: {
            id: 4,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
            password:
              "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
            confirm_password:
              "$2a$10$FhNFNIkXfJv3ByRzjVDwTen1D1jXFlU5RsOGemvpxjZPkgKtipwqS",
            bio: "",
            profile_picture: "",
            background_picture:
              "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          receiverChat: {
            id: 5,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
            password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            confirm_password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            bio: "",
            profile_picture: "",
            background_picture: "",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "a46db240-7051-4b95-88a0-750d85dcca46",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          messages: [],
        },

        { status: 200 },
      );
    },
  ),

  http.get("http://localhost:5000/groups", async () => {
    return HttpResponse.json([]);
  }),

  http.get("http://localhost:5000/groups/undefined", async () => {
    return HttpResponse.json(null, { status: 404 });
  }),

  http.get("http://localhost:5000/groups/search", async ({ request }) => {
    const url = new URL(request.url);

    const getUser = url.searchParams.get("query");

    if (!getUser) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json([
      {
        id: 5,
        first_name: "preslaw1",
        last_name: "preslaw1",
        username: "preslaw1",
        password: "12345678Bg@",
        confirm_password: "12345678Bg@",
        bio: "",
        profile_picture: "",
        background_picture: "",
      },
    ]);
  }),

  http.post("http://localhost:5000/groups", async () => {
    return HttpResponse.json(
      {
        id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
        group_name: "group",
        group_image:
          "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
        group_creatorId: 5,
        users: [
          {
            id: 5,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
            password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            confirm_password:
              "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
            bio: "",
            profile_picture: "",
            background_picture: "",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
          {
            id: 6,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
            password:
              "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
            confirm_password:
              "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
            bio: "",
            profile_picture: "",
            background_picture: "",
            online_presence: "ONLINE",
            role: "USER",
            groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
            globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
          },
        ],
        messagesGGChat: [],
      },
      { status: 200 },
    );
  }),

  http.get(
    "http://localhost:5000/groups/56cfae47-9d7f-4583-8d12-f6039ef61240",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          group_name: "group",
          group_image:
            "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
          group_creatorId: 5,
          users: [
            {
              id: 5,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
              password:
                "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
              confirm_password:
                "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
            {
              id: 6,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
              password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              confirm_password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
          ],
          messagesGGChat: [],
        },
        { status: 200 },
      );
    },
  ),

  http.put(
    "http://localhost:5000/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/join",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          group_name: "group",
          group_image:
            "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
          group_creatorId: 5,
          users: [
            {
              id: 4,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
              password:
                "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
              confirm_password:
                "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
            {
              id: 5,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
              password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              confirm_password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
            {
              id: 6,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
              password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              confirm_password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
          ],
          messagesGGChat: [],
        },
        { status: 200 },
      );
    },
  ),

  http.post(
    "http://localhost:5000/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/message",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          group_name: "group",
          group_image:
            "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
          group_creatorId: 5,
          users: [
            {
              id: 4,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
              password:
                "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
              confirm_password:
                "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
            {
              id: 5,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
              password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              confirm_password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
            {
              id: 6,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
              password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              confirm_password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
          ],
          messagesGGChat: [
            {
              id: 1,
              message_text: "hello",
              message_imageName: "",
              message_imageURL: "",
              message_imageType: "",
              message_imageSize: 0,
              createdAt: "2025-03-24T10:42:22.213Z",
              updatedAt: "2025-03-24T10:42:22.216Z",
              userId: 4,
              chatId: "73cc246e-897e-412f-8ab8-6fb4c29db485",
            },
          ],
        },
        { status: 200 },
      );
    },
  ),

  http.post(
    "http://localhost:5000/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/image",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          group_name: "group",
          group_image:
            "https://res.cloudinary.com/dsofl9wku/image/upload/v1742973488/wemessage_images/Screenshot_2025-03-07_09-15-16.png.png",
          group_creatorId: 5,
          users: [
            {
              id: 4,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
              password:
                "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
              confirm_password:
                "$2a$10$BFtkYW3Mt15L2qRZMqPeluRMhRF1w9n8QVOdqi5ZSgrhXvDETf4SW",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
            {
              id: 5,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
              password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              confirm_password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
            {
              id: 6,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
              password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              confirm_password:
                "$2a$10$GOEFM7Z.Kg7ELre4fNyqfeRO8Sn2AIfp7sTU7YuyB7GZMvgRjT21W",
              bio: "",
              profile_picture: "",
              background_picture: "",
              online_presence: "ONLINE",
              role: "USER",
              groupId: "56cfae47-9d7f-4583-8d12-f6039ef61240",
              globalChatId: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
            },
          ],
          messagesGGChat: [
            {
              id: 1,
              message_text: "",
              message_imageName: "image",
              message_imageURL: "http://image.png",
              message_imageType: "image/png",
              message_imageSize: 120,
              createdAt: "2025-03-24T10:42:22.213Z",
              updatedAt: "2025-03-24T10:42:22.216Z",
              userId: 4,
              chatId: "73cc246e-897e-412f-8ab8-6fb4c29db485",
            },
          ],
        },
        { status: 200 },
      );
    },
  ),
];
