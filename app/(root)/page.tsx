import Publication from "@/components/Publication";
import BestMentor from "../components/BestMentor";
import DomainQuickAccess from "../components/DomainQuickAccess";
import TrendingTopics from "../components/TrendingTopics";

// fake data
interface PublicationProps {
  data: {
    id: string;
    content: string;
    image: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    type: string;
    createdAt: string;
  };
}

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
        <div className="hidden md:block">
          {/* Domains Quick Access */}
          <DomainQuickAccess />

          {/* Trending Topics */}
          <TrendingTopics />

          {/* Best Mentor */}
          <BestMentor />
        </div>
      </div>
    </div>
  );
}
