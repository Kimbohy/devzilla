import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import UserDropDown from "./UserDropDown";

async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-white shadow w-full">
      <div className="flex justify-between items-center px-2 py-1">
        <div className="flex items-center gap-5"></div>
        {session && session?.user ? (
          <div className="flex gap-3 items-center">
            <Image src={"/bell.svg"} alt="bell" width={35} height={24} />
            <UserDropDown session={session} />
          </div>
        ) : (
          <Link
            href="/session"
            className="bg-primary hover:bg-primary-dark py-2 px-4 rounded-xl"
          >
            <span className="text-white text-lg">Login</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
