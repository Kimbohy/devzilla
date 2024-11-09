import ListAllDomain from "@/components/ListAllDomain";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Toutes les domaines disponibles
      </h1>
      <ListAllDomain />
    </div>
  );
};

export default Page;
