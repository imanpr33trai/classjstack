"use client";
import React from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/authClient";
import { auth } from "@/server/auth";

export const SignOut = () => {
  return <Button onClick={() => authClient.signOut}>signout</Button>;
};
