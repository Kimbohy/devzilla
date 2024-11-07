import Image from "next/image";
import React from "react";
import message from "../public/message1.png";

const Entraide = () => {
  return (
    <div className="flex w-screen md:h-screen flex-col justify-center items-center gap-8 md:flex-row md:gap-0 md:justify-between bg-[url('../public/entraide.jpg')] bg-cover bg-center ">
      <div className="w-full md:w-1/2 md:h-full flex flex-col gap-12 px-6 md:px-0 md:justify-center md:items-center pt-14">
        <p className="text-5xl font-semibold md:w-4/5 text-black">
          Bienvenue sur notre plateforme
        </p>
        <p className="text-lg md:w-4/5 text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          voluptatum accusamus placeat maxime quidem nulla pariatur alias sint
          quis. Sapiente, deserunt. Ut, optio ea fuga consectetur molestiae
          numquam quasi nostrum.
        </p>
      </div>
      <div className="md:w-1/2 mb-6">
        <Image
          src={message}
          alt="bg"
          width={600}
          height={700}
          className="md:w-[600px] md:h-[700px]"
        />
      </div>
    </div>
  );
};

export default Entraide;
