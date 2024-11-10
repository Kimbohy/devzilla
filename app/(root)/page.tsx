"use client";

import { useEffect, useState } from "react"; // Import useEffect for side effects
import Publication, { PublicationProps } from "@/components/Publication";
import DomainQuickAccess from "../../components/DomainQuickAccess";
import TrendingTopics from "../../components/TrendingTopics";
import MentorsRecommended from "@/components/MentorsRecommended";
import QuickActionSection from "@/components/QuickActionSection";
import { redirect } from "next/navigation";
// import { fetchAllDomaines, fetchPublication } from "../utils";

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
/*
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
        avatar: "/avatar.jpeg",
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
        avatar: "/avatar.jpeg",
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
        avatar: "/avatar.jpeg",
      },
      type: "Challenge",
      createdAt: "2j",
    },
  },
];
*/

/*
interface Domaine {
  _id: string;
  nom: string;
  description: string;
}
interface FetchDomainesResponse {
  success: boolean;
  message: string;
  data: Domaine[];
}
  */

/*
{
  "success": true,
  "message": "Publications trouvées",
  "data": [
    {
      "_id": "672f17f223ba6833056927ef",
      "utilisateurId": "672b60cccebbedded25fcd77",
      "type": "projet",
      "contenu": "first pub",
      "images": [
        "/image1.jpg",
        ],
        "domainesId": "672edce70d3ca97e1bf524d3",
        "reactions": [],
        "commentaires": [],
        "date": "2024-11-09T08:06:10.039Z"
        }
        ]
        }
        */
// fake data (publications)
const _publications: PublicationProps[] = [
  {
    data: {
      id: "1",
      content:
        "C'est un immense plaisir pour moi de vous partager ma victoire en tant que champion de resolution de fonction pour les collegiens ce Samedi dernier. 📚📐#Maths #ResolutionDeFonction #ProblemeSolving #PremiereMedaille",
      image: "",
      user: {
        id: "1",
        name: "Kimbohy Marisika",
        avatar: "/avatar1.jpeg",
      },
      type: "Résultats de projets",
      createdAt: "2j",
    },
  },
  {
    data: {
      id: "2",
      content:
        "L'evènnement que nous attendions tous est enfin arrivé.  🎵MUSIQUE FESTIVAL🎵 Pour la celebration de cette 1 challenge = 1 jour pendant toute la semaine du festival. Alors préparez vous dès maintenant.  #stay_tunned #musique_festival",
      image: "/image2.jpg",
      user: {
        id: "1",
        name: "Kimbohy Marisika",
        avatar: "/avatar1.jpeg",
      },
      type: "Event",
      createdAt: "2j",
    },
  },
  {
    data: {
      id: "4",
      content:
        "Bonjour à tous, je veux améliorer mes techniques vocales. Quelqu'un peut-il m'aider ?",
      image: "",
      user: {
        id: "2",
        name: "Meriam",
        avatar: "/avatar2.jpeg",
      },
      type: "question",
      createdAt: "2j",
    },
  },
  {
    data: {
      id: "5",
      content:
        "Un de mes jeunes talents a participé à la poési-clash et s'en sort vainqueur. La semaine prochaine elle va affronter les adversaires de l'étape regionale. Mes talents sont ma fierté. #viveLaPoesie",
      image: "/image5.jpg",
      user: {
        id: "3",
        name: "Marie Claire",
        avatar: "/avatar3.jpeg",
      },
      type: "Projet en cours",
      createdAt: "2j",
    },
  },
  {
    data: {
      id: "6",
      content:
        "Bonjour, une opportunité pour développer notre talent.  ✨️ Singing Competition 📆 20 Nov pour l'inscription 💰10000ar pour participer A ne pas rater.  Bon courage à tous.",
      image: "/image6.jpg",
      user: {
        id: "4",
        name: "Mialy",
        avatar: "/avatar4.jpeg",
      },
      type: "Event",
      createdAt: "1j",
    },
  },
  {
    data: {
      id: "7",
      content:
        "C'est un plaisir pour moi de vous annoncer que j'ai eu la première place de M'tendry qui est une compétition de piano pour les 6 à 12 ans. 🥰",
      image: "/image7.jpg",
      user: {
        id: "5",
        name: "Mamisoa R.",
        avatar: "/avatar5.jpeg",
      },
      type: "Résultats de projets",
      createdAt: "1j",
    },
  },
  {
    data: {
      id: "8",
      content:
        "Urgent! On cherche un poète pour animer notre évènement Pi-day qui se tiendra le 14 Mars. Si vous êtes intéressé contactez moi.",
      image: "/image8.jpg",
      user: {
        id: "6",
        name: "Fara Malala",
        avatar: "/avatar6.jpeg",
      },
      type: "Annonce",
      createdAt: "1j",
    },
  },
];

export default function Home() {
  // const isFirstLogin = localStorage.getItem("firstLogin") === "true"; // Check if it's the first login
  const isFirstLogin = false;

  const [publications, setPublications] = useState<PublicationProps[]>([]); // Initialize publications state
  // const [domaines, setDomaines] = useState<string[]>([]); // Initialize domaines state
  /*
  const fetchDomaines = async () => {
    const _domaines: FetchDomainesResponse = await fetchAllDomaines(); // Fetch domaines
    setDomaines(_domaines.data.map((domaine: Domaine) => domaine.nom));
  };
  */

  useEffect(() => {
    if (isFirstLogin) {
      redirect("/setUp"); // Redirect to setup if it's the first login
    }
    /*
    fetchDomaines(); // Fetch domaines/
    if (domaines.length > 0) {
      for (const domaine of domaines) {
        fetchPublication(domaine).then((publications) => {
          setPublications((prevPublications) => [
            ...prevPublications,
            ...publications,
          ]);
        });
      }
    }
      */
    setPublications(_publications);
  }, [isFirstLogin]); // Add isFirstLogin and router to dependency array
  return (
    <div className="container mx-auto px-4 py-1 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="grid md:grid-cols-3 gap-6 h-full">
        {/* Publications Column */}
        <div className="md:col-span-2 overflow-y-auto pr-4">
          <div className="flex flex-col gap-4 w-full items-center px-2 sm:px-4 md:px-6">
            {publications.map((publication) => (
              <Publication key={publication.data.id} pub={publication} />
            ))}
            {publications.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                Aucune publication trouvée
              </div>
            )}
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
