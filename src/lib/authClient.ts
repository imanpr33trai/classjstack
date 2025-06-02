import { createAuthClient } from "better-auth/react";

export const atuhClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
});
