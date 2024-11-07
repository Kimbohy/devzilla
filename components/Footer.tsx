"use client"; // Add this line to indicate that this is a Client Component

import Image from "next/image";
import React from "react";
import logo from "../public/talent.png";
import top from "../public/arrow-up-solid.svg";
import facebook from "../public/facebook.svg";
import instagram from "../public/insta.svg";
import linkedin from "../public/linkedin.svg";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col bg-slate-950 text-gray-100">
      <div className="flex flex-col gap-3 pb-5 md:flex-row md:justify-between md:px-14 md:items-center md:pt-11 pt-10">
        <div className="pl-5">
          <Image
            src={logo}
            alt="logo"
            width={120}
            height={120}
            className="pt-5 md:w-[300px] md:h-[300px]"
          />
          <p>Rejoignez nous pour developper votre potentiel!</p>
        </div>
        <div className="flex flex-col gap-3 pl-9 md:flex-row md:justify-between md:w-1/2">
          <div className="pt-6">
            <p className="text-2xl font-semibold pb-3 md:text-2xl">About us</p>
            <p className="text-xl pt-2 md:text-lg">Team</p>
            <p className="text-xl pt-2 md:text-lg">Story</p>
          </div>
          <div className="pt-6">
            <p className="text-2xl font-semibold pb-3 md:text-2xl">Support</p>
            <p className="text-xl pt-2 md:text-lg">Contact</p>
            <p className="text-xl pt-2 md:text-lg">FAQ&apos;s</p>
          </div>
          <div className="pt-6 md:pr-6">
            <p className="text-2xl font-semibold pb-3 md:text-2xl">Social</p>
            <div className="flex gap-2 pt-2 items-center">
              <Image src={linkedin} alt="linkedin" width={18} height={18} />
              <p className="text-xl md:text-lg">LinkedIn</p>
            </div>
            <div className="flex gap-2 pt-2 items-center">
              <Image src={facebook} alt="facebook" width={18} height={18} />
              <p className="text-xl md:text-lg">Facebook</p>
            </div>
            <div className="flex gap-2 pt-2 items-center">
              <Image src={instagram} alt="instagram" width={18} height={18} />
              <p className="text-xl md:text-lg">Instagram</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 border-t-2 border-white my-11 md:px-8"></div>
      <div className="px-5 md:flex md:justify-between md:pb-20 md:px-11">
        <div className="flex flex-col gap-3 pt-3 pl-5 pb-7 font-medium text-xl md:flex-row md:gap-12 md:w-1/2">
          <p className="pb-1 border-white border-b-[1px] max-w-fit md:border-none md:font-normal">
            Privacy policy
          </p>
          <p className="pb-1 border-white border-b-[1px] max-w-fit md:border-none md:font-normal">
            Term of services
          </p>
          <p className="pt-8 pb-1 border-white border-b-[1px] max-w-fit md:border-none md:pt-0 md:font-normal md:pl-56">
            © 2021 Talent
          </p>
        </div>
        <div className="flex gap-3 pb-6 justify-end items-center md:gap-6">
          <p
            className="font-medium text-xl cursor-pointer"
            onClick={handleScrollToTop}
          >
            Back to top
          </p>
          <Image
            src={top}
            alt="Back to top"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleScrollToTop}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
