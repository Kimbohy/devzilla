"use client";

import { useEffect } from "react"; // Import useEffect for side effects
import { useRouter } from "next/router"; // Import useRouter for redirection
import Publication, { PublicationProps } from "@/components/Publication";
import DomainQuickAccess from "../../components/DomainQuickAccess";
import TrendingTopics from "../../components/TrendingTopics";
import MentorsRecommended from "@/components/MentorsRecommended";
import QuickActionSection from "@/components/QuickActionSection";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  domain: string;
  expertise: string;
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Sophie Dupont",
    avatar: "/avatar.svg",
    domain: "Entrepreneuriat",
    expertise: "Startup et Innovation",
  },
  {
    id: "2",
    name: "Jean Martin",
    avatar: "/avatar.svg",
    domain: "Technologie",
    expertise: "Développement Web",
  },
];

// Fake data for publications
const publications: PublicationProps[] = [
  {
    data: {
      id: "1",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti nesciunt reprehenderit dolore. Non debitis modi, at eaque fugiat, nobis sequi quae dignissimos autem ipsum esse enim. Quaerat praesentium magnam quae.",
      image: "/hanina.jpg",
      user: {
        id: "1",
        name: "Kimbohy Marisika",
        avatar: "/avatar.svg",
      },
      type: "Projets en cours",
      createdAt: "2j",
    },
  },
  {
    data: {
      id: "2",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti nesciunt reprehenderit dolore. Non debitis modi, at eaque fugiat, nobis sequi quae dignissimos autem ipsum esse enim. Quaerat praesentium magnam quae.",
      image: "/hanina.jpg",
      user: {
        id: "2",
        name: "Kimbohy Marisika",
        avatar: "/avatar.svg",
      },
      type: "Résultats de projets",
      createdAt: "2j",
    },
  },
  {
    data: {
      id: "3",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti nesciunt reprehenderit dolore. Non debitis modi, at eaque fugiat, nobis sequi quae dignissimos autem ipsum esse enim. Quaerat praesentium magnam quae.",
      image: "/hanina.jpg",
      user: {
        id: "3",
        name: "Kimbohy Marisika",
        avatar: "/avatar.svg",
      },
      type: "Challenge",
      createdAt: "2j",
    },
  },
];

export default function Home() {
  const router = useRouter(); // Initialize the router
  // const isFirstLogin = localStorage.getItem("firstLogin") === "true"; // Check if it's the first login
  const isFirstLogin = true;

  useEffect(() => {
    if (isFirstLogin) {
      router.push("/setup"); // Redirect to setup if it's the first login
    }
  }, [isFirstLogin, router]); // Add isFirstLogin and router to dependency array

  return (
    <div className="container mx-auto px-4 py-1 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="grid md:grid-cols-3 gap-6 h-full">
        {/* Publications Column */}
        <div className="md:col-span-2 overflow-y-auto pr-4">
          <div className="flex flex-col gap-4 w-full items-center px-2 sm:px-4 md:px-6">
            {publications.map((publication) => (
              <Publication key={publication.data.id} pub={publication} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:block space-y-6 overflow-y-auto">
          {/* Domains Quick Access */}
          <DomainQuickAccess />

          {/* Trending Topics */}
          <TrendingTopics />

          {/* Mentors Section */}
          <MentorsRecommended mentors={mentors} />

          {/* Quick Action Section */}
          <QuickActionSection />
        </div>
      </div>
    </div>
  );
}
