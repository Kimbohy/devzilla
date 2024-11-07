// components/SearchResults.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface SearchResultsProps {
  searchTerm: string;
  searchType: "all" | "users" | "publications" | "domains";
}

interface SearchResult {
  type: "user" | "publication" | "domain";
  id: string;
  name?: string;
  content?: string;
  image?: string;
  avatar?: string;
}

export default function SearchResults({
  searchTerm,
  searchType,
}: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) return;

      setLoading(true);
      try {
        const response = await axios.get("/api/search", {
          params: {
            term: searchTerm,
            type: searchType,
          },
        });
        setResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm, searchType]);

  const renderResult = (result: SearchResult) => {
    switch (result.type) {
      case "user":
        return (
          <Link
            href={`/profile/${result.id}`}
            key={result.id}
            className="flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg"
          >
            <Image
              src={result.avatar || "/avatar.svg"}
              alt={result.name || "User"}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">{result.name}</p>
            </div>
          </Link>
        );
      case "publication":
        return (
          <Link
            href={`/publication/${result.id}`}
            key={result.id}
            className="p-4 hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-start space-x-4">
              {result.image && (
                <Image
                  src={result.image}
                  alt="Publication"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              )}
              <div>
                <p>{result.content}</p>
              </div>
            </div>
          </Link>
        );
      case "domain":
        return (
          <Link
            href={`/domaine/${result.name}`}
            key={result.id}
            className="flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg"
          >
            <Image
              src={`/domain/${result.name?.toLowerCase()}.svg`}
              alt={result.name || "Domain"}
              width={50}
              height={50}
            />
            <p className="font-semibold">{result.name}</p>
          </Link>
        );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {results.length === 0 ? (
        <p className="text-center text-gray-500">No results found</p>
      ) : (
        results.map(renderResult)
      )}
    </div>
  );
}
