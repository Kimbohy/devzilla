"use client";
import Publication from "@/components/Publication";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

// Publication types matching the ones in the publier page
const publicationTypes = [
  "Tous",
  "Projets en cours",
  "Résultats de projets",
  "Challenge",
  "Question",
  "Event",
];

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

  useEffect(() => {
    // Simulated data fetch - replace with actual API call
    const fetchPublications = async () => {
      // In a real scenario, this would be an API call
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

    fetchPublications();
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
    <div className="container mx-auto px-4 py-6">
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

      {/* Publications Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  );
}
