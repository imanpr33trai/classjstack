"use client";
import { authClient } from "@/lib/authClient";
// import { auth } from "@/server/auth";
import { signIn, signOut, signUp } from "@/server/users";
// import { headers } from "next/headers";

export default function Page() {
  const { data } = authClient.useSession();
  console.log(
    data?.user ? `User: ${data.user.email}` : "No user authenticated"
  );
  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={signIn}>signIn</button>
      <button onClick={signUp}>signUP</button>
      <button onClick={signOut}>signout</button>
      <h6>{data ? data.user.email : "No auth"}</h6>
    </div>
  );
}
