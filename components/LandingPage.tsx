import Link from "next/link";
import React from "react";
import Header from "@/components/Header";

const LandingPage = () => {
  return (
    <div className="flex flex-col w-screen md:h-screen md:gap-32 bg-[url('../public/bg2.jpg')] bg-cover bg-center">
      <Header />
      <div className="flex  justify-center md:items-center  ">
        <div className="w-full md:w-4/5 flex flex-col gap-12 px-6 pt-32 md:pt-0">
          <p className="text-5xl font-semibold text-white md:w-2/4">
            Bienvenue sur notre plateforme
          </p>
          <p className="text-lg md:w-2/4 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            voluptatum accusamus placeat maxime quidem nulla pariatur alias sint
            quis. Sapiente, deserunt. Ut, optio ea fuga consectetur molestiae
            numquam quasi nostrum.
          </p>
          <Link href="/session">
            <button className=" bg-slate-500 px-4 py-3 text-white rounded-lg mt-20 text-xl hover:bg-slate-800 mb-10">
              Commencer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
