"use client";
import ListeMentor from "@/components/ListeMentor";
import React from "react";
import { usePathname } from "next/navigation";

interface MentorProps {
  data: {
    id: string;
    type: string;
    user: {
      id: string;
      name: string;
      avatar: string;
      domaine: string; // Added domaine here to match the updated interface
    };
  };
}

// Fake data with domaine property included
const mentorlistes: MentorProps[] = [
  {
    data: {
      id: "1",
      type: "mentor",
      user: {
        id: "2",
        name: "Hary",
        avatar: "/avatar.svg",
        domaine: "Musique", // Updated domaine
      },
    },
  },
  {
    data: {
      id: "3",
      type: "mentor",
      user: {
        id: "6",
        name: "Hey",
        avatar: "/avatar.svg",
        domaine: "Mathematiques", // Updated domaine
      },
    },
  },
  {
    data: {
      id: "2",
      type: "user",
      user: {
        id: "4",
        name: "Poter",
        avatar: "/avatar.svg",
        domaine: "Chant", // Updated domaine
      },
    },
  },
  {
    data: {
      id: "4",
      type: "mentor",
      user: {
        id: "5",
        name: "Alice",
        avatar: "/avatar.svg",
        domaine: "Poésie", // Updated domaine
      },
    },
  },
  {
    data: {
      id: "6",
      type: "mentor",
      user: {
        id: "7",
        name: "Alicia",
        avatar: "/avatar.svg",
        domaine: "Poésie", // Updated domaine
      },
    },
  },
];

const Page = () => {
  const pathname = usePathname();
  const domainName = pathname?.split("/")[2];

  // Filter mentors to only include those with type "mentor" and matching domain
  const filteredMentors = mentorlistes.filter((mentor) => {
    return (
      mentor.data.type === "mentor" && // Only include mentors
      mentor.data.user.domaine.toLowerCase() ===
        decodeURIComponent(domainName?.toLowerCase() || "")
    );
  });

  return (
    <div className="flex">
      <div className="flex flex-col md:gap-5 gap-7 w-full">
        <p className="text-2xl font-semibold pl-5 pt-6 md:text-4xl">
          Liste des mentors dans le domaine{" "}
          {decodeURIComponent(domainName || "")}
        </p>
        <div className="bg-white rounded-lg mx-5 py-4 flex flex-col gap-3 shadow-lg">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((list) => (
              <div
                key={list.data.id}
                className="transition-transform duration-300 transform hover:scale-105"
              >
                <ListeMentor listes={list} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Aucun mentor trouvé dans ce domaine.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
