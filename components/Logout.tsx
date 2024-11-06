import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      className="hover:bg-slate-500 px-4 w-full"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Logout
    </button>
  );
}
