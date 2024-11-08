import Publication from "@/components/Publication";
import DomainQuickAccess from "../../components/DomainQuickAccess";
import TrendingTopics from "../../components/TrendingTopics";
import Link from "next/link";
import Image from "next/image";
import { FaFire, FaStar, FaRocket, FaUsers } from "react-icons/fa";

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
    <div className="container mx-auto px-4 py-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Publications Column */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Dernières Publications</h2>
          <div className="flex flex-col gap-4">
            {publications.map((publication) => (
              <Publication key={publication.data.id} pub={publication} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:block space-y-6">
          {/* Domains Quick Access */}
          <DomainQuickAccess />

          {/* Trending Topics */}
          <TrendingTopics />

          {/* Mentors Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaStar className="mr-2 text-yellow-500" />
              <h3 className="text-xl font-semibold">Mentors Recommandés</h3>
            </div>
            <div className="space-y-4">
              {mentors.map((mentor) => (
                <Link href={`/mentors/${mentor.id}`} key={mentor.id}>
                  <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <Image
                      src={mentor.avatar}
                      alt={mentor.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{mentor.name}</h4>
                      <p className="text-sm text-gray-500">
                        {mentor.domain} - {mentor.expertise}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Action Section */}
          <section className="mt-8 bg-primary/10 rounded-xl p-6">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Nouveau domaine à proposer ?
                </h2>
                <p className="text-gray-600">
                  Vous pouvez demander à créer un nouveau domaine sur la
                  plateforme.
                </p>
              </div>
              <Link
                href="/create"
                className="mt-4 md:mt-0 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Ajouter un Domaine
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
