import { io } from "socket.io-client";

import { JWT_TOKEN } from "@/lib/constants";

export const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL,
  {
    auth: {
      token: JWT_TOKEN,
    },
  }
);