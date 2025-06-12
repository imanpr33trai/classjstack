"use client";

import { Button } from "./ui/button";
import { signOut } from "@/lib/authClient";

interface AuthButtonsProps {
  user: any; // Replace 'any' with your user type
}

export const AuthButtons = ({ user }: AuthButtonsProps) => {
  return (
    <div className="flex flex-row gap-2">
      {user ? (
        <Button
          className="bg-[#191919]"
          onClick={async () =>
            await signOut({
              fetchOptions: {
                onError(context) {
                  console.log("Sign out error:", context.error);
                },
                onSuccess(context) {
                  console.log("Sign out successful:", context.data);
                },
              },
            })
          }
          variant="destructive"
        >
          Logout
        </Button>
      ) : (
        <Button className="bg-[#191919]" href="/sign-in" variant="destructive">
          Login
        </Button>
      )}
      {user ? (
        <Button href="/ads/ad" variant="default">
          Post Ad
        </Button>
      ) : (
        <Button href="/sign-up">SignUp</Button>
      )}
    </div>
  );
};
