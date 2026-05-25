import axios from "axios";

import { JWT_TOKEN } from "@/lib/constants";

export const api = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_URL}/api`,

  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
});