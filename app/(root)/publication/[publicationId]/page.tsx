// app/publication/[publicationId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PublicationContent from "@/components/PublicationContent";
import PublicationHeader from "@/components/PublicationHeader";
import PublicationImage from "@/components/PublicationImage";
import PublicationActions from "@/components/PublicationActions";

// Define interfaces for publication data
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
    domain: string;
  };
}

// Sample publications data
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
      domain: "Mathematiques",
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
      domain: "Musique",
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
      domain: "Chant",
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
      domain: "Poésie",
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
      domain: "Chant",
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
      domain: "Musique",
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
      domain: "Poésie",
    },
  },
];

const Page = () => {
  const { publicationId } = useParams() as { publicationId: string };
  const [publication, setPublication] = useState<PublicationProps | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchPublication = async () => {
    try {
      // Find the publication by ID
      const foundPublication = _publications.find(
        (pub) => pub.data.id === publicationId
      );
      if (foundPublication) {
        setPublication(foundPublication);
      } else {
        setError(new Error("Publication not found"));
      }
    } catch (err) {
      console.error("Error fetching publication:", err);
      setError(
        err instanceof Error ? err : new Error("An unexpected error occurred")
      );
    }
  };

  useEffect(() => {
    fetchPublication();
  }, [publicationId]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-2 5a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <strong className="font-bold block mb-1">
                Erreur de chargement de la publication
              </strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!publication) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 max-w-[800px] mx-auto">
        <PublicationHeader
          user={publication.data.user}
          createdAt={publication.data.createdAt}
          type={publication.data.type}
        />
        <PublicationContent content={publication.data.content} />
        {publication.data.image && (
          <PublicationImage image={publication.data.image} />
        )}
        <PublicationActions
          pubId={publication.data.id}
          setShowComments={() => {}}
          showComments={false}
          userId={publication.data.user.id}
        />
      </div>
    </div>
  );
};

export default Page;
