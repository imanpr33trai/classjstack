"use server";

import { authClient } from "@/lib/authClient";

export const signIn = async () => {
  await authClient.signIn.email({
    email: "manpr33t@gmail.com",
    password: "123456789",
  });
};

export const signUp = async () => {
  await authClient.signUp.email({
    email: "manpr33t@gmail.com",
    password: "123456789",
    name: "Manpreet",
    lastName: "Singh",
  });
};
export const signOut = async () => {
  await authClient.signOut();
};
