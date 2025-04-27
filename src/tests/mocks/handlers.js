import { http, HttpResponse } from "msw";

import localhostURL from "../../utility/localhostURL";

export const handlers = [
  http.post(`${localhostURL}/users/signup`, async ({ request }) => {
    const result = await request.json({
      first_name: "preslaw",
      last_name: "preslaw",
      username: "preslaw",
      password: "12345678Bg@",
      confirm_password: "12345678Bg@",
      role: "ADMIN",
    });

    return HttpResponse.json(result, { status: 200 });
  }),

  http.post(`${localhostURL}/users/login_guest`, async ({ request }) => {
    const result = await request.json({
      username: "preslaw1",
      password: "12345678Bg@",
    });

    return HttpResponse.json(result, { status: 200 });
  }),
  http.post(`${localhostURL}/users/login`, async ({ request }) => {
    const result = await request.json({
      username: "preslaw",
      password: "12345678Bg@",
    });

    // console.log(result);

    return HttpResponse.json(result, { status: 200 });
  }),

  http.get(`${localhostURL}/users`, async () => {
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

  http.get(`${localhostURL}/users/1`, async () => {
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

  http.put(`${localhostURL}/users/profile/background_image/1`, async () => {
    const form = new FormData();

    const bgImageFile = new File(["image"], "image.png", {
      type: "image/png",
    });

    form.set("file", bgImageFile, "image/png");

    fetch(`${localhostURL}/users/profile/background_image/1`, {
      method: "PUT",
      body: form,
    });
  }),
];

http.put(`${localhostURL}/users/profile/image/1`, async () => {
  const form = new FormData();

  const bgImageFile = new File(["image"], "image.png", { type: "image/png" });

  form.set("file", bgImageFile, "image/png");

  console.log(form);

  fetch(`${localhostURL}/users/profile/background_image/1`, {
    method: "PUT",
    body: form,
  });
});

http.put(`${localhostURL}/users/profile/edit/1`, async () => {
  return HttpResponse.json(
    {
      id: 1,
      first_name: "preslaw123",
      last_name: "preslaw123",
      username: "preslaw123",
      bio: "bio123",
      // password: "12345678Bg@@",
      // confirm_password: "12345678Bg@@",
    },
    { status: 200 },
  );
});

http.get(`${localhostURL}/chats`, async () => {
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
  http.get(`${localhostURL}/users`, async () => {
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
  http.get(`${localhostURL}/users/1`, async () => {
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
  http.get(`${localhostURL}/users/all`, async () => {
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
  http.get(`${localhostURL}/users/search`, async ({ request }) => {
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
  http.get(`${localhostURL}/users/2`, async () => {
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
  http.post(`${localhostURL}/chats`, async () => {
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
    `${localhostURL}/chats/73cc246e-897e-412f-8ab8-6fb4c29db485`,
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
    `${localhostURL}/chats/73cc246e-897e-412f-8ab8-6fb4c29db485/message`,
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
    `${localhostURL}/chats/73cc246e-897e-412f-8ab8-6fb4c29db485/message/1`,
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
    `${localhostURL}/chats/73cc246e-897e-412f-8ab8-6fb4c29db485/message/1`,
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
  );

http.get(`${localhostURL}/groups`, async () => {
  return HttpResponse.json([]);
}),
  http.get(`${localhostURL}/groups/undefined`, async () => {
    return HttpResponse.json(null, { status: 404 });
  }),
  http.get(`${localhostURL}/groups/search`, async ({ request }) => {
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
  http.post(`${localhostURL}/groups`, async () => {
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
    `${localhostURL}/groups/56cfae47-9d7f-4583-8d12-f6039ef61240`,
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
    `${localhostURL}/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/join`,
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
    `${localhostURL}/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/message`,
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
    `${localhostURL}/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/image`,
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
    `${localhostURL}/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/message/1`,
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
    `${localhostURL}/groups/56cfae47-9d7f-4583-8d12-f6039ef61240/message/1`,
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
    `${localhostURL}/groups/56cfae47-9d7f-4583-8d12-f6039ef61240`,
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
  );

  http.post(`${localhostURL}/globalChat`, async () => {
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
      `http://localhost:5000/globalChat/e280338e-f5b9-4942-884f-b48ea0e6c2df`,
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

    http.get(`http://localhost:5000/users/search`, async ({ request }) => {
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
      `http://localhost:5000/globalChat/56cfae47-9d7f-4583-8d12-f6039ef61240/message`,
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
      `http://localhost:5000/globalChat/56cfae47-9d7f-4583-8d12-f6039ef61240/image`,
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
      `http://localhost:5000/globalChat/56cfae47-9d7f-4583-8d12-f6039ef61240/message/1`,
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
      `http://localhost:5000/globalChat/56cfae47-9d7f-4583-8d12-f6039ef61240/message/1`,
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
    );
