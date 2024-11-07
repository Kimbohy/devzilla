"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Publier() {
  const pathname = usePathname();
  const domaineName = decodeURIComponent(pathname?.split("/")[2] || "");
  const [selectedType, setSelectedType] = useState("");

  const publicationTypes = [
    "Projets en cours",
    "Résultats de projets",
    "Challenge",
    "Question",
    "Event",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
        Publier dans {domaineName}
      </h1>

      <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
        <Image
          src="/avatar.svg"
          alt="user"
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="text-lg text-gray-700 font-medium">
          Kimbohy Marisika
        </span>
      </div>

      <form className="space-y-4">
        <div id="type-de-publication" className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">
            Type de publication
          </label>
          <div className="flex flex-wrap gap-2">
            {publicationTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                  ${
                    selectedType === type
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <textarea
          name="content"
          id="content"
          cols={30}
          rows={10}
          placeholder="Que voulez-vous partager?"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        ></textarea>

        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="text-sm text-gray-600">
            Ajouter une image
          </label>
          <input
            type="file"
            id="file"
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-white
            hover:file:bg-primary-dark
            cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium"
        >
          Publier
        </button>
      </form>
    </div>
  );
}
