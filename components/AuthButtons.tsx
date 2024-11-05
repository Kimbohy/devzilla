// components/AuthButtons.tsx
"use client";
import { signInWithProvider } from "@/serverActions";
import Image from "next/image";

const AuthButtons = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <span>Sign in with</span>
      <div className="flex justify-center gap-5">
        <form action={() => signInWithProvider("github")}>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary hover:bg-gray-100"
          >
            <Image src={"/Github.svg"} alt="github" width={20} height={20} />
            <span>Github</span>
          </button>
        </form>

        <form action={() => signInWithProvider("google")}>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary hover:bg-gray-100"
          >
            <Image src={"/Google.svg"} alt="google" width={20} height={20} />
            <span>Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthButtons;
