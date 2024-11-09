"use client";
import { useEffect, useState } from "react"; // Import useEffect and useState
import axios from "axios"; // Import axios for making HTTP requests
import Domain from "@/components/Domain";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

interface DomainType {
  name: string;
  icon: string;
}

const Page = () => {
  const [domains, setDomains] = useState<DomainType[]>([]); // State to hold the domains
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state
  const { data: session } = useSession();
  const router = useRouter(); // Initialize the router
  const userId = session?.id; // Get user ID from session
  console.log(session?.user?.email);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get(
          "https://ta-lenta.onrender.com/domaine"
        ); // Fetch domains from the endpoint
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

  const handleSubmit = async (domainName: string) => {
    try {
      const response = await axios.post(
        "https://ta-lenta.onrender.com/profile",
        {
          domainName,
          userId,
        }
      );
      console.log("Response from server:", response.data);
      router.push("/"); // Redirect to the root after successful submission
    } catch (error) {
      console.error("Error sending domain selection:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Choisissez les domaines que vous souhaitez explorer
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.name}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col items-center justify-center"
          >
            <button onClick={() => handleSubmit(domain.name)}>
              <Domain name={domain.name} icon={domain.icon} />
              <span className="mt-2 text-lg font-semibold text-gray-700">
                {domain.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
