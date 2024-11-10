// app/(root)/profile/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileUser from "@/components/ProfileUser"; // Adjust the path as necessary

// Define interfaces for publication and profile data
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

export interface SocialMedia {
  lien: string;
  nom: string;
}

export interface MentorApprenticeRelation {
  mentor?: string;
  apprenti?: string;
  domaine: string;
}

export interface ProfileProps {
  _id: string;
  nom: string;
  email: string;
  type: string;
  photoProfil: string;
  description: string;
  competence: string[];
  reseauxSociaux: SocialMedia[];
  domaines: string[];
  mentor: MentorApprenticeRelation[];
  apprenti: MentorApprenticeRelation[];
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
  const { data: session } = useSession();
  const [user, setUser] = useState<ProfileProps | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { userId } = useParams() as { userId: string };

  const fetchProfile = async () => {
    try {
      console.log("Session:", session);
      console.log("User  ID from Params:", userId);

      // If there's a session, we can use the session data
      if (session && session.user) {
        const currentUserEmail = session.user.email;

        // Find the user in the publications data
        const userFromPublications = _publications.find(
          (publication) => publication.data.user.id === userId
        );

        if (userFromPublications) {
          setUser({
            _id: userFromPublications.data.user.id,
            nom: userFromPublications.data.user.name,
            email: currentUserEmail || "",
            type: "User ", // You can customize this based on your logic
            photoProfil: userFromPublications.data.user.avatar || "/avatar.png",
            description:
              "Je suis un jeune artiste qui cherche à améliorer ses compétences",
            competence: ["Chant", "Musique"],
            reseauxSociaux: [
              { lien: "https://facebook.com", nom: "Facebook" },
              { lien: "https://twitter.com", nom: "Twitter" },
            ],
            domaines: ["Chant", "Musique"],
            mentor: [],
            apprenti: [],
          });
        } else if (decodeURI(userId) === session.user.name) {
          // If the user is the same as the current user, we can use the session data
          setUser({
            _id: userId,
            nom: session.user.name || "",
            email: currentUserEmail || "",
            type: "User ", // You can customize this based on your logic
            photoProfil: session.user.image || "/avatar.png",
            description:
              "Je suis un jeune artiste qui cherche à améliorer ses compétences",
            competence: [],
            reseauxSociaux: [
              { lien: "https://facebook.com", nom: "Facebook" },
              { lien: "https://twitter.com", nom: "Twitter" },
            ],
            domaines: [],
            mentor: [],
            apprenti: [],
          });
        } else {
          console.log("No user found in publications for userId:", userId);
          setUser(null); // No user found
        }
      } else {
        console.error("User  session not found");
        setError(new Error("User  session not found"));
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(
        err instanceof Error ? err : new Error("An unexpected error occurred")
      );
    }
  };

  useEffect(() => {
    fetchProfile();
    // No need to setError here, it's handled in fetchProfile
  }, [session, userId]); // Added dependencies to useEffect

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="w- 6 h-6 mr-4"
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
                Erreur de chargement du profil
              </strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Actualiser
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileUser
        profile={user}
        connectedUseName={session?.user?.name || ""}
      />
    </div>
  );
};

export default Page;
