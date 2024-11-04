import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={150} height={33} />
        </Link>
        <div className="flex items-center gap-5"></div>
        {session && session?.user ? (
          <>
            <Link href="/startup/create">
              <span>Create Startup</span>
            </Link>
            <form
              action={async () => {
                "use server";
                signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit">Logout</button>
            </form>
            <Link href={`/user/${session?.user.id}`}>
              <span>{session?.user.name}</span>
            </Link>
          </>
        ) : (
          <div>
            <Link href="/session">
              <span>Login</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
