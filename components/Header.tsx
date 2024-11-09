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
          <button className="bg-primary text-white px-8 py-3 rounded-lg shadow-lg hover:bg-primary-dark transition-colors text-lg font-semibold">
            Se connecter
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
