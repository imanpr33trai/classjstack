"use server";
import { auth } from "./auth";

export const signUp = async ({
  email,
  lastname,
  firstname,
  password,
}: {
  email: string;
  lastname: string;
  firstname: string;
  password: string;
}) => {
  await auth.api.signUpEmail({
    body: {
      email,
      lastname,
      name: `${firstname} ${lastname}`,
      password,
      callbackURL: "/articles",
    },
  });
};
