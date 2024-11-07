import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import UserDropDown from "./UserDropDown";
import axios from "axios";

async function Navbar() {
  const session = await auth();
  let unreadNotificationsCount = 0;

  if (session?.user) {
    try {
      const response = await axios.get("/api/notifications/unread-count");
      unreadNotificationsCount = response.data.count;
    } catch (error) {
      console.error("Failed to fetch unread notifications", error);
    }
  }

  return (
    <header className="bg-white shadow w-full">
      <div className="flex justify-between items-center px-2 py-1">
        <div className="flex items-center gap-5"></div>
        {session && session?.user ? (
          <div className="flex gap-3 items-center">
            <Link href="/notifications" className="relative">
              <Image src={"/bell.svg"} alt="bell" width={35} height={24} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>
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
