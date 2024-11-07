"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Annonce {
  id: string;
  title: string;
  description: string;
  image?: string;
  user: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}

interface AnnoncesListingProps {
  domaineName: string;
}

export default function AnnoncesListing({ domaineName }: AnnoncesListingProps) {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get("/api/annonces", {
          params: { domain: domaineName },
        });
        setAnnonces(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch annonces:", err);
        setError("Impossible de charger les annonces");
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, [domaineName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {annonces.length === 0 ? (
        <p className="text-gray-500 text-center">Aucune annonce disponible</p>
      ) : (
        annonces.map((annonce) => (
          <div
            key={annonce.id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-2">
              <Image
                src={annonce.user.avatar}
                alt={annonce.user.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{annonce.user.name}</h3>
                <p className="text-xs text-gray-500">{annonce.createdAt}</p>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-2">{annonce.title}</h4>
            <p className="text-gray-600 mb-2">{annonce.description}</p>
            {annonce.image && (
              <div className="relative w-full h-48 mt-2">
                <Image
                  src={annonce.image}
                  alt={annonce.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
