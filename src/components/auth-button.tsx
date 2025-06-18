"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "@/lib/authClient";
import { useSession } from "@/lib/authClient";
import { LoadingSpinner } from "./loading-spinner";

export const AuthButtons = () => {
  const router = useRouter();
  const { data: session, isPending, error } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (isPending) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {session ? (
        <>
          <Button variant="destructive" onClick={handleSignOut}>
            Logout
          </Button>
          <Button href="/ads/ad" variant="default">
            Post Ad
          </Button>
        </>
      ) : (
        <>
          <Button href="/sign-in" variant="destructive">
            Login
          </Button>
          <Button href="/sign-up" variant="default">
            Sign Up
          </Button>
        </>
      )}
    </>
  );
};
