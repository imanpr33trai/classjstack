// import { useEffect, useState } from "react";
import { authClient } from "@/lib/authClient";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export async function SessionStatus() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      {!session ? "Not signed in" : `Signed in as ${session.user?.email}`}
    </div>
  );
}
