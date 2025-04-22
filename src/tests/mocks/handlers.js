import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:5000/users/signup", async ({ request }) => {
    const result = await request.json();

    const signUpObject = {
      first_name: result.first_name,
      last_name: result.last_name,
      username: result.username,
      password: result.password,
      confirm_password: result.confirm_password,
      role: "ADMIN",
    };

    // console.log(signUpObject);

    return HttpResponse.json(signUpObject, { status: 200 });
  }),

  http.post("http://localhost:5000/users/login_guest", async ({ request }) => {
    const result = await request.json();

    const logInObject = {
      username: "preslaw1",
      password: result.password,
    };

    // console.log(logInObject);

    return HttpResponse.json(logInObject, { status: 200 });
  }),

  http.post("http://localhost:5000/users/login", async ({ request }) => {
    const result = await request.json();

    const logInObject = {
      username: "preslaw",
      password: result.password,
    };

    // console.log(logInObject);

    return HttpResponse.json(logInObject, { status: 200 });
  }),

  http.get("http://localhost:5000/users", async () => {
    return HttpResponse.json(
      {
        id: 1,
        first_name: "preslaw",
        last_name: "preslaw",
        username: "preslaw",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),

  http.get("http://localhost:5000/users/1", async () => {
    return HttpResponse.json(
      {
        id: 1,
        first_name: "preslaw",
        last_name: "preslaw",
        username: "preslaw",
        password: "12345678Bg@",
      },
      { status: 200 },
    );
  }),

  http.put(
    "http://localhost:5000/users/profile/background_image/1",
    async () => {
      const form = new FormData();

      const bgImageFile = new File(["image"], "image.png", {
        type: "image/png",
      });

      form.set("file", bgImageFile, "image/png");

      fetch("http://localhost:5000/users/profile/background_image/1", {
        method: "PUT",
        body: form,
      });
    },
  ),

  http.put("http://localhost:5000/users/profile/image/1", async () => {
    const form = new FormData();

    const bgImageFile = new File(["image"], "image.png", { type: "image/png" });

    form.set("file", bgImageFile, "image/png");

    console.log(form);

    fetch("http://localhost:5000/users/profile/background_image/1", {
      method: "PUT",
      body: form,
    });
  }),

  http.put("http://localhost:5000/users/profile/edit/1", async () => {
    return HttpResponse.json(
      {
        id: 1,
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
    "http://localhost:5000/users/profile/change_passwords/1",
    async () => {
      return HttpResponse.json(
        {
          id: 1,
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
        senderChatId: 1,
        receiverChatId: 2,
        senderChat: {
          id: 1,
          first_name: "preslaw",
          last_name: "preslaw",
          username: "preslaw",
        },
        receiverChat: {
          id: 2,
          first_name: "preslaw1",
          last_name: "preslaw1",
          username: "preslaw1",
        },
        messages: [],
      },
    ]);
  }),

  http.get("http://localhost:5000/users", async () => {
    return HttpResponse.json(
      {
        id: 1,
        first_name: "preslaw",
        last_name: "preslaw",
        username: "preslaw",
      },
      { status: 200 },
    );
  }),

  http.get("http://localhost:5000/users/1", async () => {
    return HttpResponse.json(
      {
        id: 1,
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
        id: 1,
        first_name: "preslaw",
        last_name: "preslaw",
        username: "preslaw",
      },
      {
        id: 2,
        first_name: "preslaw1",
        last_name: "preslaw1",
        username: "preslaw1",
      },
      {
        id: 3,
        first_name: "preslaw2",
        last_name: "preslaw2",
        username: "preslaw2",
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
        id: 2,
        first_name: "preslaw1",
        last_name: "preslaw1",
        username: "preslaw1",
      },
    ]);
  }),

  http.get("http://localhost:5000/users/2", async () => {
    return HttpResponse.json(
      {
        id: 2,
        first_name: "preslaw1",
        last_name: "preslaw1",
        username: "preslaw1",
      },
      { status: 200 },
    );
  }),

  http.post("http://localhost:5000/chats", async () => {
    return HttpResponse.json(
      {
        id: "73cc246e-897e-412f-8ab8-6fb4c29db485",
        senderChatId: 1,
        receiverChatId: 2,
        senderChat: {
          id: 1,
          first_name: "preslaw",
          last_name: "preslaw",
          username: "preslaw",
        },
        receiverChat: {
          id: 2,
          first_name: "preslaw1",
          last_name: "preslaw1",
          username: "preslaw1",
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
          senderChatId: 1,
          receiverChatId: 2,
          senderChat: {
            id: 1,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
          },
          receiverChat: {
            id: 2,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
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
          senderChatId: 1,
          receiverChatId: 2,
          senderChat: {
            id: 1,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
          },
          receiverChat: {
            id: 2,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
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
              senderMessageId: 1,
              receiverId: 2,
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
          senderChatId: 1,
          receiverChatId: 2,
          senderChat: {
            id: 1,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
          },
          receiverChat: {
            id: 2,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
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
              senderMessageId: 1,
              receiverId: 2,
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
          senderChatId: 1,
          receiverChatId: 2,
          senderChat: {
            id: 1,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
          },
          receiverChat: {
            id: 2,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
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
        id: 3,
        first_name: "preslaw2",
        last_name: "preslaw2",
        username: "preslaw2",
      },
    ]);
  }),

  http.post("http://localhost:5000/groups", async () => {
    return HttpResponse.json(
      {
        id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
        group_name: "group",
        group_image: "image.png",
        group_creatorId: 1,
        users: [
          {
            id: 1,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
          },
          {
            id: 2,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
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
          group_creatorId: 1,
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
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
          group_image: "image.png",
          group_creatorId: 1,
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
            {
              id: 3,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
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
          group_image: "image.png",
          group_creatorId: 1,
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
            {
              id: 3,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
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
              userId: 1,
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
          group_image: "image.png",
          group_creatorId: 1,
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
            {
              id: 3,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
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
              userId: 1,
            },
          ],
        },
        { status: 200 },
      );
    },
  ),

  http.put(
    "http://localhost:5000/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/message/1",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          group_name: "group",
          group_image: "image.png",
          group_creatorId: 1,
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
            {
              id: 3,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
            },
          ],
          messagesGGChat: [
            {
              id: 1,
              message_text: "new message",
              message_imageName: "",
              message_imageURL: "",
              message_imageType: "",
              message_imageSize: 0,
              createdAt: "2025-03-24T10:42:22.213Z",
              updatedAt: "2025-03-24T10:42:22.216Z",
              userId: 1,
            },
          ],
        },
        { status: 200 },
      );
    },
  ),

  http.delete(
    "http://localhost:5000/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/message/1",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          group_name: "group",
          group_image: "image.png",
          group_creatorId: 1,
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
            {
              id: 3,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
            },
          ],
          messagesGGChat: [],
        },
        { status: 200 },
      );
    },
  ),

  http.put(
    "http://localhost:5000/groups/56cfae47-9d7f-4583-8d12-f6039ef61240",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          group_name: "edited group",
          group_image: "image.png",
          group_creatorId: 1,
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
            {
              id: 3,
              first_name: "preslaw2",
              last_name: "preslaw2",
              username: "preslaw2",
            },
          ],
          messagesGGChat: [],
        },
        { status: 200 },
      );
    },
  ),

  http.post("http://localhost:5000/globalChat", async () => {
    return HttpResponse.json(
      {
        id: "e280338e-f5b9-4942-884f-b48ea0e6c2df",
        users: [
          {
            id: 1,
            first_name: "preslaw",
            last_name: "preslaw",
            username: "preslaw",
          },
          {
            id: 2,
            first_name: "preslaw1",
            last_name: "preslaw1",
            username: "preslaw1",
          },
        ],
        messagesGGChat: [],
      },
      { status: 200 },
    );
  }),

  http.get(
    "http://localhost:5000/globalChat/e280338e-f5b9-4942-884f-b48ea0e6c2df",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
          ],
          messagesGGChat: [],
        },
        { status: 200 },
      );
    },
  ),

  http.get("http://localhost:5000/users/search", async ({ request }) => {
    const url = new URL(request.url);

    const getUser = url.searchParams.get("query");

    if (!getUser) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json([
      {
        id: 1,
        first_name: "preslaw1",
        last_name: "preslaw1",
        username: "preslaw1",
      },
    ]);
  }),

  http.post(
    "http://localhost:5000/globalChat/56cfae47-9d7f-4583-8d12-f6039ef61240/message",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
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
              userId: 1,
            },
          ],
        },
        { status: 200 },
      );
    },
  ),

  http.post(
    "http://localhost:5000/globalChat/56cfae47-9d7f-4583-8d12-f6039ef61240/image",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
          ],
          messagesGGChat: [
            {
              id: 1,
              message_text: "",
              message_imageName: "image",
              message_imageURL: "http://image.com",
              message_imageType: "image/png",
              message_imageSize: 120,
              createdAt: "2025-03-24T10:42:22.213Z",
              updatedAt: "2025-03-24T10:42:22.216Z",
              userId: 1,
            },
          ],
        },
        { status: 200 },
      );
    },
  ),

  http.put(
    "http://localhost:5000/globalChat/56cfae47-9d7f-4583-8d12-f6039ef61240/message/1",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
          ],
          messagesGGChat: [
            {
              id: 1,
              message_text: "edited message",
              message_imageName: "",
              message_imageURL: "",
              message_imageType: "",
              message_imageSize: 0,
              createdAt: "2025-03-24T10:42:22.213Z",
              updatedAt: "2025-03-24T10:42:22.216Z",
              userId: 1,
            },
          ],
        },
        { status: 200 },
      );
    },
  ),

  http.delete(
    "http://localhost:5000/globalChat/56cfae47-9d7f-4583-8d12-f6039ef61240/message/1",
    async () => {
      return HttpResponse.json(
        {
          id: "56cfae47-9d7f-4583-8d12-f6039ef61240",
          users: [
            {
              id: 1,
              first_name: "preslaw",
              last_name: "preslaw",
              username: "preslaw",
            },
            {
              id: 2,
              first_name: "preslaw1",
              last_name: "preslaw1",
              username: "preslaw1",
            },
          ],
          messagesGGChat: [],
        },
        { status: 200 },
      );
    },
  ),
];
