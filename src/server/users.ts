"use server";

import { auth } from "@/server/auth";

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "manpr33t@gmail.com",
      password: "123456789",
    },
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "manpr33t@gmail.com",
      password: "123456789",
      name: "Manpreet",
      lastname: "Singh",
    },
  });
};
export const signOut = async () => {
  await auth.api.signOut({
    headers: {
      delete: "true",
    },
  });
};
