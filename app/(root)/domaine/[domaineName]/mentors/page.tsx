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
      domaine: string;
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
        domaine: "Poésie", // Updated domaine
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
        domaine: "Poésie", // Updated domaine
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

  const filteredMentors = mentorlistes.filter((mentor) => {
    return (
      mentor.data.type === "mentor" &&
      mentor.data.user.domaine.toLowerCase() ===
        decodeURIComponent(domainName?.toLowerCase() || "")
    );
  });

  return (
    <div className="flex flex-col md:gap-5 gap-7 w-full">
      <h1 className="text-xl font-semibold pl-5 pt-6 md:text-3xl">
        Liste des mentors dans le domaine de{" "}
        {decodeURIComponent(domainName || "")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-4 mx-5">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((list) => (
            <ListeMentor key={list.data.id} listes={list} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Aucun mentor trouvé dans ce domaine.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
