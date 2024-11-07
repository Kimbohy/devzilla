import Image from "next/image";
import React from "react";
import talent from "../public/talent.png";
import Link from "next/link";

const Invitation = () => {
  return (
    <div className="flex w-screen md:h-screen flex-col justify-center items-center gap-8 md:flex-row md:justify-between">
      <div className="flex flex-col gap-4 md:w-1/2 md:h-full">
        <div className="flex flex-col justify-center items-center pt-14 gap-11 pl-6  md:pl-14">
          <p className="text-3xl font-semibold md:text-5xl md:pt-40">
            Vous aussi, ne manquez pas votre chance
          </p>
          <p className="text-lg  text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            rerum exercitationem nemo neque quae dolore voluptas perspiciatis,
            quo tempora? Perferendis ducimus alias magni dolorum ex eos modi
            quibusdam, assumenda necessitatibus?
          </p>
        </div>
        <Link href="/session" className="pl-7 md:pl-14 md:pt-10">
          <button className="bg-slate-500 px-4 py-3 text-white rounded-lg mt-16 text-xl hover:bg-slate-800">
            Rejoindre
          </button>
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <Image
          src={talent}
          alt="bg"
          width={600}
          height={700}
          className="md:w-[600px] md:h-[600px]"
        />
      </div>
    </div>
  );
};

export default Invitation;
