import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <svg
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      Logout
    </button>
  );
}
