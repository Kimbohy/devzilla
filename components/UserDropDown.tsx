"use client";

import { useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import Logout from "./Logout";

export default function UserDropDown({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" relative">
      {session.user && (
        <Image
          src={session.user.image || "/default-profile.png"}
          alt="profile picture"
          width={64}
          height={64}
          className="rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
      {isOpen && (
        <div className=" absolute bg-neutral-300 py-4 m-2 right-1 shadow rounded-lg">
          <button className=" hover:bg-slate-500 px-4 w-full">Profile</button>
          <button className=" hover:bg-slate-500 px-4 w-full">Settings</button>
          <Logout />
        </div>
      )}
    </div>
  );
}
