"use client";
import Publication from "@/components/Publication";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RightSideFeatures from "@/components/RightSideFeatures";

// Publication types matching the ones in the publier page
const publicationTypes = [
  "Tous",
  "Projets en cours",
  "Résultats de projets",
  "Challenge",
  "Question",
  "Event",
];

// Interfaces
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
  };
}

interface TopContributor {
  id: string;
  name: string;
  avatar: string;
  publicationCount: number;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  description: string;
}

export default function Page() {
  const params = useParams();
  const [publications, setPublications] = useState<PublicationProps[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<
    PublicationProps[]
  >([]);
  const [selectedType, setSelectedType] = useState("Tous");

  // Decode the URL-encoded domaineName
  const decodedDomaineName = decodeURIComponent(
    Array.isArray(params?.domaineName)
      ? params.domaineName[0]
      : params?.domaineName || ""
  );

  // New state for right-side features
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [relatedDomains, setRelatedDomains] = useState<string[]>([]);

  useEffect(() => {
    // Fetch publications
    const fetchPublications = async () => {
      // Simulated data - replace with actual API call
      const _publications: PublicationProps[] = [
        {
          data: {
            id: "1",
            content: "Projet de développement en cours",
            image: "/hanina.jpg",
            type: "Projets en cours",
            user: {
              id: "1",
              name: "Kimbohy Marisika",
              avatar: "/avatar.svg",
            },
            createdAt: "2j",
          },
        },
        {
          data: {
            id: "2",
            content: "Résultat d'un projet intéressant",
            image: "/hanina.jpg",
            type: "Résultats de projets",
            user: {
              id: "2",
              name: "Jean Dupont",
              avatar: "/avatar.svg",
            },
            createdAt: "1j",
          },
        },
        {
          data: {
            id: "3",
            content: "Nouveau challenge lancé !",
            image: "/hanina.jpg",
            type: "Challenge",
            user: {
              id: "3",
              name: "Marie Dubois",
              avatar: "/avatar.svg",
            },
            createdAt: "3j",
          },
        },
      ];

      setPublications(_publications);
      setFilteredPublications(_publications);
    };

    // Fetch additional data for right-side features
    const fetchAdditionalData = async () => {
      // Simulated data - replace with actual API calls
      setTopContributors([
        {
          id: "1",
          name: "Kimbohy Marisika",
          avatar: "/avatar.svg",
          publicationCount: 15,
        },
        {
          id: "2",
          name: "Jean Dupont",
          avatar: "/avatar.svg",
          publicationCount: 10,
        },
        {
          id: "3",
          name: "Marie Dubois",
          avatar: "/avatar.svg",
          publicationCount: 8,
        },
      ]);

      setUpcomingEvents([
        {
          id: "1",
          title: "Hackathon Innovation",
          date: "15 Juin 2023",
          description: "Événement de création et d'innovation",
        },
        {
          id: "2",
          title: "Conférence Technologique",
          date: "22 Juillet 2023",
          description: "Partage des dernières avancées technologiques",
        },
      ]);

      setRelatedDomains([
        "Intelligence Artificielle",
        "Développement Web",
        "Entrepreneuriat",
      ]);
    };

    fetchPublications();
    fetchAdditionalData();
  }, [decodedDomaineName]);

  // Filter publications based on selected type
  useEffect(() => {
    if (selectedType === "Tous") {
      setFilteredPublications(publications);
    } else {
      const filtered = publications.filter(
        (pub) => pub.data.type === selectedType
      );
      setFilteredPublications(filtered);
    }
  }, [selectedType, publications]);

  return (
    <div className="flex">
      <div className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {decodedDomaineName}
        </h1>

        {/* Publication Type Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {publicationTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
              ${
                selectedType === type
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Publications */}
        <div className="flex flex-col gap-4 items-center">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((publication) => (
              <Publication key={publication.data.id} pub={publication} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Aucune publication trouvée pour ce type
            </div>
          )}
        </div>
      </div>

      {/* Right Part with Enhanced Features */}
      <RightSideFeatures
        publications={publications.map((pub) => ({
          id: pub.data.id,
          title: pub.data.content,
          date: pub.data.createdAt,
          content: pub.data.content,
        }))}
        topContributors={topContributors}
        publicationTypes={publicationTypes}
        upcomingEvents={upcomingEvents}
        relatedDomains={relatedDomains}
      />
    </div>
  );
}
