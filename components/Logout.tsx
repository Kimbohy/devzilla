import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Logout() {
  return (
    <button
      className="hover:bg-slate-500 px-4 w-full flex gap-3 py-2 transition-all"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <Image src={"/logout.svg"} alt="logout" width={24} height={24} />
      <span>Logout</span>
    </button>
  );
}
