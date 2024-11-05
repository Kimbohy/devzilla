// app/session/page.tsx
import { auth } from "@/auth";
import SessionClient from "@/components/SessionClient";

export default async function SessionPage() {
  const session = await auth();

  return <SessionClient session={session} />;
}
