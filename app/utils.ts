import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface PublicationProps {
  data: {
    id: string;
    content: string;
    image: string;
    type: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
    domain: string;
  };
}

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

export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const goToLandingIfNotLoggedIn = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/LandingPage");
  }
};

export const fetchPublication = async (domaineName: string) => {
  /*
  const response = await fetch(
    `https://ta-lenta.onrender.com/publications?domainName=${domaineName}`
  );
  const publications = await response.json();
  console.log(publications);
  */
  const publications = _publications.filter(
    (publication) => publication.data.domain === domaineName
  );

  return publications;
};

export const fetchAllDomaines = async () => {
  const response = await fetch("https://ta-lenta.onrender.com/domains");
  const domaines = await response.json();
  return domaines;
};

export const getUser = async (email: string) => {
  const response = await fetch(
    `https://ta-lenta.onrender.com/users?userEmail=${email}&status=1`
  );
  const user = await response.json();
  if (user.success) {
    return user.data.user._id as string;
  }
  return "unknown";
};
