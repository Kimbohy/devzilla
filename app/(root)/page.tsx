import Publication, { PublicationProps } from "@/components/Publication";
import DomainQuickAccess from "../../components/DomainQuickAccess";
import TrendingTopics from "../../components/TrendingTopics";
import MentorsRecommended from "@/components/MentorsRecommended";
import QuickActionSection from "@/components/QuickActionSection";

// fake data
// New interfaces for additional features
interface Challenge {
  id: string;
  title: string;
  domain: string;
  participants: number;
  deadline: string;
}

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  domain: string;
  expertise: string;
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Développement d'Application Mobile Innovante",
    domain: "Technologie",
    participants: 45,
    deadline: "30 jours restants",
  },
  {
    id: "2",
    title: "Projet de Recherche en Intelligence Artificielle",
    domain: "Science",
    participants: 32,
    deadline: "45 jours restants",
  },
];

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

// fake data:
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

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-1 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="grid md:grid-cols-3 gap-6 h-full">
        {/* Publications Column */}
        <div className="md:col-span-2 overflow-y-auto pr-4">
          {/* <h2 className="text-2xl font-bold mb-6 sticky top-0 bg-white z-10">
            Dernières Publications
          </h2> */}
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
