"use server";
import { authClient } from "@/lib/authClient";
import { auth } from "./auth";

export const signUp = async ({
  email,
  lastName,
  firstName,
  password,
}: {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
}) => {
  await authClient.signUp.email({
    email,
    lastName,
    name: `${firstName} ${lastName}`,
    password,
    callbackURL: "/articles",
  });
};
