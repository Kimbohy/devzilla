import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../public/talent.png";

const Header = () => {
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="flex md:justify-between w-full md:px-20 md:items-center">
        <Image
          src={logo}
          alt="logo"
          width={120}
          height={120}
          className="pt-5 px-3 md:w-[150px] md:h-[150px]"
        />
        <Link href="/session" className="hidden md:block">
          <button className="bg-slate-500 px-4 py-3 text-white rounded-lg mt-16 text-xl hover:bg-slate-800">
            Se connecter
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
