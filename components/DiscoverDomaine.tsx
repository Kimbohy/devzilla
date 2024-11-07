import Image from "next/image";
import React from "react";
import business from "../public/business.png";
import art from "../public/art1.png";
import science from "../public/science1.png";

const DiscoverDomaine = () => {
  return (
    <div className="flex flex-col w-screen md:h-screen gap-5 items-center pt-4 md:gap-28 bg-slate-950 text-white">
      <div className="flex pt-14">
        <p className="text-3xl md:text-5xl font-semibold pl-7">
          Decouvrez divers domaines qui pourra vous intéresser
        </p>
      </div>
      <div className="flex flex-col md:flex-row w-full md:justify-between md:px-24 justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4 pt-6">
          <Image
            src={business}
            alt="bg"
            width={200}
            height={200}
            className="md:w-[300px] md:h-[300px]"
          />
          <p className="text-3xl font-semibold">Entrepreneuriat</p>
          <p>Des divers domaine dans le business</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 pt-6">
          <Image
            src={science}
            alt="bg"
            width={200}
            height={200}
            className="md:w-[300px] md:h-[300px]"
          />
          <p className="text-3xl font-semibold">Science</p>
          <p>Des divers domaine dans la musique</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 pt-6">
          <Image
            src={art}
            alt="bg"
            width={200}
            height={200}
            className="md:w-[300px] md:h-[300px]"
          />
          <p className="text-3xl font-semibold">Art</p>
          <p className="pb-5">Des divers domaine dans la musique</p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverDomaine;
