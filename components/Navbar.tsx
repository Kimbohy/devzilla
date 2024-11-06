import Link from "next/link";
import { auth } from "@/auth";
import UserDropDown from "./UserDropDown";

async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-white shadow w-full">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-5"></div>
        {session && session?.user ? (
          <>
            <UserDropDown session={session} />
          </>
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
