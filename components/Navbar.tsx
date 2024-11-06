import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center p-2">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={60} height={60} />
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
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit">Logout</button>
            </form>
            <Link href={`/user/${session?.user.id}`}>
              <span>{session?.user.name}</span>
            </Link>
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
