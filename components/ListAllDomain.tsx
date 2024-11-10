"use client";
import { useEffect, useState } from "react"; // Import useEffect and useState
import Link from "next/link"; // Import Link from next/link
import Domain from "@/components/Domain";
// import axios from "axios"; // Import axios for making HTTP requests

const ListAllDomain = () => {
  interface DomainType {
    _id: string; // Add the ID field for each domain
    nom: string; // Domain name
    description: string; // Domain description (if needed)
  }

  const domain: DomainType[] = [
    {
      nom: "Musique",
      _id: "/domain/musique.svg",
      description:
        "La musique est l'art de combiner les sons de manière harmonieuse.",
    },
    {
      nom: "Mathematiques",
      _id: "/domain/mathematiques.svg",
      description:
        "Les mathématiques sont une science qui étudie les nombres, les figures et les structures.",
    },
    {
      nom: "Chant",
      _id: "/domain/chant.svg",
      description: "Le chant est l'art de produire des sons avec la voix.",
    },
    {
      nom: "Poésie",
      _id: "/domain/poesie.svg",
      description:
        "La poésie est un genre littéraire qui utilise des mots pour exprimer des émotions et des idées.",
    },
  ] as const;

  const [domains, setDomains] = useState<DomainType[]>([]); // State to hold the domains
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state

  useEffect(() => {
    const fetchDomains = async () => {
      /*
      try {
        const response = await axios.get(
          "https://ta-lenta.onrender.com/domains"
        ); // Fetch domains from the endpoint
        if (response.data.success) {
          // Check if the response indicates success
          setDomains(response.data.data); // Set the fetched domains to state
        } else {
          setError("Failed to fetch domains"); // Handle case where success is false
        }
      } catch {
        setError("Failed to fetch domains"); // Set error if the request fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
        */
      setDomains(domain);
      setLoading(false);
      setError(null);
    };

    fetchDomains(); // Call the fetch function
  }, []); // Empty dependency array to run once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show error message
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {domains.map((domain) => (
        <Link
          key={domain._id} // Use the unique ID as the key
          href={`/domaine/${domain.nom.toLowerCase()}`} // Set the href to redirect to the appropriate domain
          className="bg-white rounded-lg shadow-md p-4 transition-transform duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center"
        >
          <div className="flex flex-col justify-center items-center">
            <Domain
              name={domain.nom}
              icon={`/domain/${
                domain.nom !== "Poésie" ? domain.nom.toLowerCase() : "poesie"
              }.svg`}
              isOnSideBar={false}
            />{" "}
            {/* Assuming the icon path */}
            <span className="text-base mt-2 text-gray-700">{domain.nom}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListAllDomain;
