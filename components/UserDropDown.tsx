"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import Logout from "./Logout";
import Link from "next/link";

export default function UserDropDown({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      {session.user && (
        <Image
          src={session.user.image || "/default-profile.svg"}
          alt="profile picture"
          width={40}
          height={40}
          className="rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
      {isOpen && (
        <div className="absolute bg-neutral-300 py-4 m-2 right-1 shadow rounded-lg w-52 flex flex-col gap-2 transition-all">
          <button className="hover:bg-slate-500 px-4 w-full flex gap-3 py-2">
            <Image src={"/user.svg"} alt="user" width={24} height={24} />
            <Link href="/profile">
              <span>Profile</span>
            </Link>
          </button>
          <Logout />
        </div>
      )}
    </div>
  );
}
