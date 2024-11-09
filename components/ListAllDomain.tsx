"use client";
import { useEffect, useState } from "react"; // Import useEffect and useState
import Link from "next/link"; // Import Link from next/link
import Domain from "@/components/Domain";
import axios from "axios"; // Import axios for making HTTP requests

const ListAllDomain = () => {
  interface DomainType {
    name: string;
    icon: string;
  }

  const [domains, setDomains] = useState<DomainType[]>([]); // State to hold the domains
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get("http://localhost:8080/domaine"); // Fetch domains from the endpoint
        setDomains(response.data); // Set the fetched domains to state
      } catch {
        setError("Failed to fetch domains"); // Set error if the request fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDomains(); // Call the fetch function
  }, []); // Empty dependency array to run once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show error message
  }

  // const domains = [
  //   { name: "Musique", icon: "/domain/musique.svg" },
  //   { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
  //   { name: "Chant", icon: "/domain/chant.svg" },
  //   { name: "Poésie", icon: "/domain/poesie.svg" },
  // ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {domains.map((domain) => (
        <Link
          key={domain.name}
          href={`/domaine/${domain.name.toLowerCase()}`} // Set the href to redirect to the appropriate domain
          className="bg-white rounded-lg shadow-md p-4 transition-transform duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center"
        >
          <div className="flex flex-col justify-center items-center">
            <Domain name={domain.name} icon={domain.icon} isOnSideBar={false} />
            <span className="text-base mt-2 text-gray-700">{domain.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListAllDomain;
