import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NextAuthClient from "./NextAuthClient";

const NextAuthServer = async () => {
  const session = await auth();
  if (session && session?.user) {
    redirect("/");
  }
  return <NextAuthClient />;
};

export default NextAuthServer;
